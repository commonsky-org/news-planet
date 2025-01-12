import json
import requests

citiesData = []
countriesData = {}

with open("./src/cities.json") as jsonFile:
  citiesData = json.load(jsonFile)
  jsonFile.close()

with open("./src/countries.json") as jsonFile:
  countriesData = json.load(jsonFile)
  jsonFile.close()

def updateCountriesFromGM(countriesData):
  newCountries = {}
  for name in countriesData:
    country = countriesData[name]
    if "city" in country:
      response = requests.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + country["city"] + ",%20" + name + "&inputtype=textquery&fields=formatted_address,name,geometry&key=")

      gmapsResponse = response.json()
      country["geometry"] = gmapsResponse["candidates"][0]["geometry"]
    else:
      print("No capital city found for: " + name)
    
    newCountries[name.lower()] = country


  f = open("countries-output.json", "a")
  f.write(json.dumps(newCountries))
  f.close()  

def updateCountriesFromRC(countriesData):
  for name in countriesData:
    country = countriesData[name]
    response = requests.get("https://restcountries.eu/rest/v2/name/" + name.split(",")[0])
    #print(response)

    if response.status_code == 200:
      countryResponse = response.json()
      country["city"] = countryResponse[len(countryResponse) - 1]["capital"]
      country["flag"] = countryResponse[len(countryResponse) - 1]["flag"]
      country["currencies"] = countryResponse[len(countryResponse) - 1]["currencies"]
      country["languages"] = countryResponse[len(countryResponse) - 1]["languages"]
      country["translations"] = countryResponse[len(countryResponse) - 1]["translations"]
      country["area"] = countryResponse[len(countryResponse) - 1]["area"]
      country["population"] = countryResponse[len(countryResponse) - 1]["population"]
    else:
      print("Could not find country: " + name)

  f = open("countries-output.json", "w")
  f.write(json.dumps(countriesData))
  f.close()

updateCountriesFromGM(countriesData)