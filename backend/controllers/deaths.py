from typing import Dict
import requests, json

# set up population, max and min variables, as well as dictionary for data
population: int = 0
max: int = 0
min: int = 0
returndict: Dict[int, str] = {}

url = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/internal/megafile--deaths.json")
text = url.text
data = json.loads(text)

url2 = requests.get("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json")
text2 = url2.text
populations = json.loads(text2)


