from typing import Dict
from datetime import date
from dateutil.relativedelta import relativedelta
from importdata import dbimport
import requests, json

# function to get oldest date of data
def getFDate(i: int, end_day: str) -> str:
    fDate: str = ""
    while str(data['date'][i]) != end_day:
        i = i - 1
    if str(data['date'][i]) == end_day:
        i = i + 1
    fDate = str(data['date'][i])
    return fDate

# function to get country code
def getCode(name: str) -> str:
    if name == "Bonaire Sint Eustatius and Saba":
        name = "Bonaire, Sint Eustatius and Saba"
    if name == "British Virgin Islands":
        name = "Virgin Islands (British)"
    if name == "Cape Verde":
        name = "Cabo Verde"
    if name == "Curacao":
        name = "Curaçao"
    if name == "Democratic Republic of Congo":
        name = "Congo, Democratic Republic of the"
    if name == "Faeroe Islands":
        name = "Faroe Islands"
    if name == "Iran":
        name = "Iran (Islamic Republic of)"
    if name == "Laos":
        name = "Lao People's Democratic Republic"
    if name == "Moldova":
        name = "Moldova, Republic of"
    if name == "Palestine":
        name = "Palestine, State of"
    if name == "Russia":
        name = "Russian Federation"
    if name == "South Korea":
        name = "Korea, Republic of"
    if name == "Syria":
        name = "Syrian Arab Republic"
    if name == "Taiwan":
        name = "Taiwan, Province of China"
    if name == "Tanzania":
        name = "Tanzania, United Republic of"
    if name == "Timor":
        name = "Timor-Leste"
    if name == "United Kingdom":
        name = "United Kingdom of Great Britain and Northern Ireland"
    if name == "United States":
        name = "United States of America"
    if name == "Venezuela":
        name = "Venezuela (Bolivarian Republic of)"
    if name == "Vietnam":
        name = "Viet Nam"
    if name == "Iran":
        name = "Iran (Islamic Republic of)"
    if name == "Bolivia":
        name = "Bolivia (Plurinational State of)"
    j: int = 0
    code: str = ""
    while j < len(codes):
        if codes[j]['name'] == name:
            code = codes[j]['alpha-3']
        j += 1
    return code

# function to get Death Per Capita
#def getDPC(name: str, deaths: int) -> float:
#    j: int = 0
#    dpc: float = 0
#    population: int = 1
#    while j < len(populations):
#        if populations[j]['country'] == name:
#            population = populations[j]['population']
#        j += 1
#    dpc = deaths / population
#    return dpc

# Function that updates min and max values
def checkValue (vpm: float):
    global max
    global min
    if vpm > max:
        max = vpm
    if vpm < min:
        min = vpm

# function to parse through mega JSON with all vax data
def parse(end_day: str, start_day: str) -> Dict:
    dataList = []
    returnDict: Dict = {}
    i: int = 0
    start_vacc: int = 0
    end_vacc: int = 0
    fDate: str =  start_day
    while i <= len(data['location']) - 1:
        dataDict: Dict = {} 
        codeDict: Dict = {}
        if str(data['date'][i]) == start_day: 
            start_vacc = data['total_vaccinations_per_hundred'][i] # get vax at specified beginning date
        if str(data['date'][i]) == end_day:
            end_vacc = data['total_vaccinations_per_hundred'][i] # get vax at specified end date
            name = data['location'][i] # get name, country code, vax in specified time, and death per capita
            fDate = getFDate(i - 1, end_day)
            code = getCode(name)
            if code != "":
                try:
                    vax = end_vacc - start_vacc 
                    if vax < 0:
                        vax = end_vacc # if vax less than 0, we don't have enough data. Use total deaths instead
                except:
                    vax = 0
                #dpc = getDPC(name, deaths)
                checkValue(vax)
                dataDict['name'] = name
                dataDict['num'] = vax
                dataDict['reportDate1'] = fDate
                codeDict[code] = dataDict
                dataList.append(codeDict)
        i += 1 
    returnDict['min'] = min
    returnDict['max'] = max
    returnDict['data'] = dataList
    return returnDict 

def main() -> Dict:

    finalDict: Dict = {}
    global min
    global max
    
    end_day = date.today() - relativedelta(days=2)
    start_day = "Beginning"
    finalDict['allTime'] = parse(str(end_day), str(start_day))

    max = 0.0 # reset min and max after every new parsing data call
    min = 100.0

    end_day = date.today() - relativedelta(days=2)
    start_day = end_day - relativedelta(years=1)
    finalDict['lastYear'] = parse(str(end_day), str(start_day))

    max = 0.0
    min = 100.0

    end_day = date.today() - relativedelta(days=2)
    start_day = end_day - relativedelta(months=6)
    finalDict['last6Months'] = parse(str(end_day), str(start_day))

    max = 0.0
    min = 100.0

    end_day = date.today() - relativedelta(days=2)
    start_day = end_day - relativedelta(days=30)
    finalDict['last30Days'] = parse(str(end_day), str(start_day))

    return finalDict

if __name__ == "__main__":
    max: float = 0.0
    min: float = 100.0 # set up max and min variables
    
    url = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/internal/megafile--vaccinations.json")
    text = url.text 
    data = json.loads(text) # read in vaccine data JSON

    #url2 = requests.get("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json")
    #text2 = url2.text
    #populations = json.loads(text2) # read in population data JSON

    url3 = requests.get("https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json")
    text3 = url3.text
    codes = json.loads(text3) # read in country code data JSON

    finaljson = main()
    dbimport(finaljson, "vacc")