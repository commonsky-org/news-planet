import json
from datetime import date
from datetime import datetime
from google.oauth2 import service_account
from google.cloud import bigquery
from google.cloud import storage

storage_client = storage.Client()
bucket = storage_client.bucket("planetapi")
all_blobs = list(storage_client.list_blobs(bucket, prefix='news/archive/news'))

results = {}

for blob in all_blobs:
  textBlob = blob.download_as_text()
  jsonBlob = json.loads(textBlob)

  for article in jsonBlob["articles"]:
    for tag in article["tags"]:
      tagObject = {
        "locations": {},
        "articles": []
      }
      if not tag in results:
        results[tag] = tagObject
      else:
        tagObject = results[tag]

      tagObject["articles"].append(article)
      if not article["location"] in tagObject["locations"].keys():
        tagObject["locations"][article["location"]] = jsonBlob["locations"][article["location"]]

for tag in results:
  if tag != "'s":
    print(tag)
    f = open("tmp/" + tag + ".json", "w")
    f.write(json.dumps(results[tag]))
    f.close()

    tagblob = bucket.blob("news/tags/" + tag + ".json")
    tagblob.upload_from_filename("tmp/" + tag + ".json")
      

