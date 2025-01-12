import os

from re import escape
import web
import gzip
import re
import feedparser
import json
import random
import string
import requests
import time
import datetime
import hashlib
from datetime import date
from datetime import datetime
from google.oauth2 import service_account
# from google.cloud import bigquery
from google.cloud import storage
from google.cloud.storage import fileio
import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, SafetySetting
from lib import geoservice

# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

# nlp = spacy.load('en_core_web_lg')

urls = (
    '/news(.*)', 'news',
    '/github(.*)', 'github'
)
app = web.application(urls, globals())

class news:
  geos = geoservice.geoservice()
  feeds = {
    "northamerica": [],
    "southamerica": [],
    "europe": [],
    "asia": [],
    "africa":[]
  }

  CLEANR = re.compile('\u003C.*?\u003E')

  def __init__(self):
    with open("./feeds/northamerica.json") as jsonFile:
      self.feeds["northamerica"] = json.load(jsonFile)
      jsonFile.close()

    with open("./feeds/southamerica.json") as jsonFile:
      self.feeds["southamerica"] = json.load(jsonFile)
      jsonFile.close()

    with open("./feeds/europe.json") as jsonFile:
      self.feeds["europe"] = json.load(jsonFile)
      jsonFile.close()

    with open("./feeds/asia.json") as jsonFile:
      self.feeds["asia"] = json.load(jsonFile)
      jsonFile.close()   

    with open("./feeds/africa.json") as jsonFile:
      self.feeds["africa"] = json.load(jsonFile)
      jsonFile.close()     

  def GET(self, name):

    gcswrite = "true"
    if "gcswrite" in web.input(): gcswrite = web.input().gcswrite

    outputwrite = "false"
    if "outputwrite" in web.input(): outputwrite = web.input().outputwrite

    filter = ""
    if "filter" in web.input(): filter = web.input().filter

    sources = "all"
    if "sources" in web.input(): sources = web.input().sources

    response = {
      "geo": {
        "type": "FeatureCollection",
        "features": []
      },
      "news": {
        "articles": [],
        "locations": {}
      }
    }

    print("starting: " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S"))

    for region in self.feeds:
      if sources == "all" or sources == region:
          region_response = self.process_region(region, gcswrite, filter)
          response["geo"]["features"] = response["geo"]["features"] + region_response["geo"]["features"]
          response["news"]["articles"] = response["news"]["articles"] + region_response["news"]["articles"]
          response["news"]["locations"] = response["news"]["locations"] | region_response["news"]["locations"]

    response["geo"] = self.geos.generateGeojson(response["news"])

    #Sort by date
    response["news"]["articles"] = sorted(
      response["news"]["articles"],
      key=lambda x: datetime.strptime(x['published'], "%Y-%m-%dT%H:%M:%S"), reverse=True
    )

    f = open("./output/latest-news.json".format(region=region), "w")
    f.write(json.dumps(response["news"]))
    f.close()

    f = open("./output/latest-geo.json".format(region=region), "w")
    f.write(json.dumps(response["geo"]))
    f.close()

    ## Save to cloud storage in gzip
    if gcswrite == "true":
        storage_client = storage.Client()
        bucket = storage_client.bucket(os.getenv('BUCKET_NAME'))
        newsblob = bucket.blob("news/latest-news.json")
        newsblob.content_encoding = 'gzip'
        newsblob.content_type = 'application/json'

        geoblob = bucket.blob("news/latest-geo.json")
        geoblob.content_encoding = 'gzip'
        geoblob.content_type = 'application/json'
        
        writer = fileio.BlobWriter(newsblob)
        gz = gzip.GzipFile(fileobj=writer, mode="wb")
        gz.write(json.dumps(response["news"]).encode('utf-8'))
        gz.close()
        writer.close()

        writer = fileio.BlobWriter(geoblob)
        gz = gzip.GzipFile(fileobj=writer, mode="wb")
        gz.write(json.dumps(response["geo"]).encode('utf-8'))
        gz.close()
        writer.close()

    web.header('Content-Type', 'application/json')
    if (outputwrite == "true"):
        return json.dumps(response, indent=2)
    else:
        return json.dumps({"result": "OK"})
  
  def process_region(self, region, gcswrite, filter):

    response = self.get_news(self.feeds[region], filter)
    geoJson = self.geos.generateGeojson(response)

    f = open("./output/latest-news-{region}.json".format(region=region), "w")
    f.write(json.dumps(response))
    f.close()

    f = open("./output/latest-geo-{region}.json".format(region=region), "w")
    f.write(json.dumps(geoJson))
    f.close()

    ## Save to cloud storage in gzip
    if gcswrite == "true":
        storage_client = storage.Client()
        bucket = storage_client.bucket(os.getenv('BUCKET_NAME'))
        newsblob = bucket.blob("news/latest-news-{region}.json".format(region=region))
        newsblob.content_encoding = 'gzip'
        newsblob.content_type = 'application/json'

        geoblob = bucket.blob("news/latest-geo-{region}.json".format(region=region))
        geoblob.content_encoding = 'gzip'
        geoblob.content_type = 'application/json'
        
        writer = fileio.BlobWriter(newsblob)
        gz = gzip.GzipFile(fileobj=writer, mode="wb")
        gz.write(json.dumps(response).encode('utf-8'))
        gz.close()
        writer.close()

        writer = fileio.BlobWriter(geoblob)
        gz = gzip.GzipFile(fileobj=writer, mode="wb")
        gz.write(json.dumps(geoJson).encode('utf-8'))
        gz.close()
        writer.close()

    return {
      "geo": geoJson,
      "news": response
    }

  def get_news(self, feeds, filter):

    response = {
      "locations": {},
      "articles": []
    }

    for feed in feeds:

      if filter != "" and not feed["name"].startswith(filter):
          continue

      if feed["language"] == "en":
        print(datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + " processing " + feed["name"])
        # Only do english language news for now
        d = feedparser.parse(feed["feed"], agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36')
        #print(d)
        for x in d.entries:

          if hasattr(x, 'title'):
            print(" - " + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + " processing " + x["title"])
            newId = str(hash(x.title))[1:13]

            exclusionFound = False
            for exclWord in feed["exclusionWords"]:
              if exclWord in x.title:
                exclusionFound = True
                break
            
            if exclusionFound:
              continue

            pubDate = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
            shortPubDate = datetime.now().strftime("%Y-%m-%d")
            try:
              tempPublished = x.published
              if "dateReplace" in feed:
                for rep in feed["dateReplace"]:
                  tempPublished = tempPublished.replace(rep, feed["dateReplace"][rep])

              pubDate = datetime.strptime(tempPublished, feed["dateFormat"]).strftime("%Y-%m-%dT%H:%M:%S")
              shortPubDate = datetime.strptime(tempPublished, feed["dateFormat"]).strftime("%Y-%m-%d")
            except:
              if "published" in x:
                print("Error parsing datetime " + x.published + " from news provider " + feed["name"] + " with format " + feed["dateFormat"])

            item = {
              "source": feed["name"],
              "countryCode": feed["countryCode"],
              "region": feed["region"],
              "language": feed["language"],
              "icon": feed["icon"],
              "id": newId, #''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(8)),
              "title": x.title,
              "link": x.link,
              "published": pubDate,
              "shortPublished": shortPubDate,
              "image": "https://icon-library.com/images/world-map-icon-png/world-map-icon-png-20.jpg"
            }

            if "description" in x:
              cleantext = re.sub(self.CLEANR, '', x.description)
              item["description"] = cleantext
            else:
              item["description"] = ""

            if "replaceTitleWords" in feed:
              for value in feed["replaceTitleWords"]:
                item["title"] = item["title"].replace(value, "").capitalize()

            item["tags"] = []
            
            locationName = self.getLocation(item["title"]).strip()
            print(locationName)

            geoData = self.geos.findLocation(locationName, feed["country"])
            geoData["flag"] = "https://icon-library.com/images/world-map-icon-png/world-map-icon-png-20.jpg"
            locationName = string.capwords(geoData["key"])

            item["location"] = locationName
            if not locationName in response["locations"]:
              response["locations"][locationName] = geoData
              response["locations"][locationName]["images"] = self.geos.findLocationImages(locationName)

            if response["locations"][locationName]["images"] and len(response["locations"][locationName]["images"]) > 0:
              item["image"] = response["locations"][locationName]["images"][random.randrange(len(response["locations"][locationName]["images"]) - 1)]

            response["articles"].append(item)

    #print(json.dumps(articles, indent=2))

    # #Sort by date
    # response["articles"] = sorted(
    #   response["articles"],
    #   key=lambda x: datetime.strptime(x['published'], "%Y-%m-%dT%H:%M:%S"), reverse=True
    # )

    print("Processed " + str(len(response["articles"])) + " articles.")

    return response

  def getLocation(self, text):
    result = ""
    vertexai.init(project="cloud32x", location="europe-west3")
    model = GenerativeModel(
      "gemini-1.5-flash-001",
    )
    responses = model.generate_content(
      ["provide the city and country closest to this news story. only provide a city and country, no other answers are allowed." + text],
      generation_config=generation_config,
      safety_settings=safety_settings,
      stream=True,
    )

    for response in responses:
      result += response.text

    return result.strip()

generation_config = {
    "max_output_tokens": 8192,
    "temperature": 1,
    "top_p": 0.95,
}

safety_settings = [
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold=SafetySetting.HarmBlockThreshold.OFF
    ),
]


if __name__ == "__main__":
    app.run()