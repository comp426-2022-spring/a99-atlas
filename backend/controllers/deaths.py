from typing import Dict
from datetime import date
from dateutil.relativedelta import relativedelta
import requests, json

# set up index, max and min variables, as well as dictionaries for data
i: int = 0
max: float = 0.0
min: float = 0.0
dataDict: Dict [str, float] = {} 
returnDict: Dict = {}

# most current date in data
end_day = date.today() - relativedelta(days=1)
start_day = end_day - relativedelta(months=6)

# read in different necessary JSON files
url = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/internal/megafile--deaths.json")
text = url.text
data = json.loads(text)

url2 = requests.get("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json")
text2 = url2.text
populations = json.loads(text2)

url3 = requests.get("https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json")
text3 = url3.text
codes = json.loads(text3)

def getCode(name: str) -> str:
    j: int = 0
    code: str = ""
    while j < len(codes):
        if codes[j]['name'] == name:
            code = codes[j]['alpha-3']
        j += 1
    return code

def getDPC(name: str, deaths: int) -> float:
    j: int = 0
    dpc: float = 0
    population: int = 1
    while j < len(populations):
        if populations[j]['country'] == name:
            population = populations[j]['population']
        j += 1
    dpc = deaths / population
    return dpc

def checkValue (dpc: float):
    global max
    global min
    if dpc > max:
        max = dpc
    if dpc < min:
        min = dpc

start_deaths: int = 0
end_deaths: int = 0

while i <= len(data['location']) - 1:
    if str(data['date'][i]) == str(start_day):
        start_deaths = data['total_deaths'][i]
    if str(data['date'][i]) == str(end_day):
        end_deaths = data['total_deaths'][i]
        name = data['location'][i]
        code = getCode(name)
        deaths = end_deaths - start_deaths 
        dpc = getDPC(name, deaths)
        checkValue(dpc)
        dataDict[code] = deaths
    i += 1

print(dataDict)