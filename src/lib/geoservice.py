import json
import requests

class geoservice:
  citiesData = []
  countriesData = {}
  cities = {}

  def __init__(self):
    with open("./input/cities.json") as jsonFile:
      self.citiesData = json.load(jsonFile)
      jsonFile.close()
    
    with open("./input/countries.json") as jsonFile:
      self.countriesData = json.load(jsonFile)
      jsonFile.close()
    
    for city in self.citiesData:
      keyName = city["city"].lower() + ", " + city["country"].lower()
      self.cities[keyName] = city

      # cityName = city["city"].lower()
      # countryName = city["country"].lower()
      # #regionName = city["subcountry"].lower()

      # if cityName in self.cities:
      #   self.cities[cityName].append(city)
      # else:
      #   self.cities[cityName] = [city]
      
      # if countryName in self.countries:
      #   self.countries[countryName].append(city)
      # else:
      #   self.countries[countryName] = [city]

      # if "subcountry" in city:
      #   region = str(city["subcountry"]).lower()
      #   if region in self.regions:
      #     self.regions[region].append(city)
      #   else:
      #     self.regions[region] = [city]

      #   if "subcountrycapital" in city:
      #     self.regionalCapitals[region] = city
          

  # def findLocation(self, words, sourceCountry, sourceState):
  #   location = {}
  #   newWords = words
  #   for word in words:
  #     if "(" in word:
  #       parts = word.split("(")
  #       parts[0] = parts[0].strip()
  #       parts[1] = parts[1][0:len(parts[1])-1]
  #       newWords = newWords + parts
  #     else:
  #       newWords = newWords + word.split()

  #   tagsCountry = ""
  #   tagsState = ""

  #   tagsCountryLocation = {}
  #   tagsStateLocation = {}

  #   # First check countries
  #   for word in newWords:
  #     #newWord = word.replace(" ", "-")
  #     if word in self.countriesData:
  #       tagsCountry = word
  #       tagsCountryLocation = self.countriesData[word]
  #       break
    
  #   # Then check cities and states
  #   for word in newWords:
  #     if word in self.cities:
  #       for city in self.cities[word]:
  #         if city["subcountry"].lower() in newWords or sourceState.lower() == city["subcountry"].lower():
  #           tagsStateLocation = city
  #           break
        
  #       if tagsStateLocation != {}: break
  #     else: 
  #       if word in self.regions:
  #         tagsState = word

  #         if word in self.regionalCapitals:
  #           tagsStateLocation = self.regionalCapitals[word]
  #         else:
  #           for city in self.regions[word]:
  #             if city["subcountry"] == sourceState:
  #               tagsStateLocation = city
  #               break

  #           if tagsStateLocation == {}:
  #             tagsStateLocation = self.regions[word][0]
          
  #         break
    
  #   if tagsStateLocation != {}:
  #     location = tagsStateLocation
  #   elif tagsCountryLocation != {}:
  #     location = tagsCountryLocation
  #   elif sourceState != "" and sourceState.lower() in self.regionalCapitals:
  #     location = self.regionalCapitals[sourceState.lower()]
  #   elif sourceCountry != "" and sourceCountry.lower() in self.countriesData:
  #     location = self.countriesData[sourceCountry.lower()]
      
  #   return location

  def findLocation(self, locationString, sourceCountry):
    result = {}

    if locationString.lower() in self.cities:
      result = self.cities[locationString.lower()]
      result["key"] = locationString.lower()
    else:
      countryNameParts = locationString.split(",")
      if len(countryNameParts) > 1:
        countryName = countryNameParts[1].strip().lower()
        if countryName in self.countriesData:
          newLocationString = self.countriesData[countryName]["city"].lower() + ", " + countryName
          if newLocationString in self.cities:
            result = self.cities[newLocationString]
            result["key"] = newLocationString

    if result == {}:
      if sourceCountry != "" and sourceCountry.lower() in self.countriesData:
        newLocationString = self.countriesData[sourceCountry.lower()]["city"].lower() + ", " + sourceCountry.lower()
        if newLocationString in self.cities:
          result = self.cities[newLocationString]
          result["key"] = newLocationString
    
    if result == {}:
      # last chance, choose middle city of the earth
      result = self.cities["quito, ecuador"]
      result["key"] = "quito, ecuador"
      
    return result

  def findLocationImages(self, location):
    r = requests.get(url='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + location + '&gsrprop=snippet&iiurlwidth=300&prop=imageinfo&iiprop=url&rawcontinue&gsrnamespace=6&format=json')
    result = []

    if "query" in r.json():
      for key in r.json()["query"]["pages"]:
        item = r.json()["query"]["pages"][key]
        if "imageinfo" in item and len(item["imageinfo"]) > 0:
          if "thumburl" in item["imageinfo"][0]:
            result.append(item["imageinfo"][0]["thumburl"])
          elif "url" in item["imageinfo"][0]:
            result.append(item["imageinfo"][0]["url"])

    return result

  def generateGeojson(self, news):
    result = {
      "type": "FeatureCollection",
      "features": []
    }

    locIndexes = {}
    
    for item in news["articles"]:
      feature = {}
      if not item["location"] in locIndexes:
        feature = {
          "type": "Feature",
          "properties": {
            "name": item["location"],
            "title": item["title"],
            "imageUrl": news["locations"][item["location"]]["flag"],
            "icon": item["icon"],
            "description": item["description"],
            "source": item["source"],
            "sourceUrl": item["link"]
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              news["locations"][item["location"]]["geometry"]["location"]["lng"],
              news["locations"][item["location"]]["geometry"]["location"]["lat"]
            ]
          }
        }

        result["features"].append(feature)
        locIndexes[item["location"]] = len(result["features"]) - 1
      else:
        feature = result["features"][locIndexes[item["location"]]]
        feature["properties"]["title"] += "::" + item["title"]
        feature["properties"]["description"] += "::" + item["description"]
        feature["properties"]["source"] += "::" + item["source"]
        feature["properties"]["sourceUrl"] += "::" + item["link"]
        feature["properties"]["icon"] += "::" + item["icon"]

    return result
  