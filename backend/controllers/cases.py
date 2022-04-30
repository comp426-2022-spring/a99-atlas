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
        i = i + 2
    fDate = str(data['date'][i])
    return fDate

# function to get country code
def getCode(name: str) -> str:
    if name == "Bonaire Sint Eustatius and Saba":
        name = "Bonaire, Sint Eustatius and Saba"
    if name == "British Virgin Islands":
        name = "Virgin Islands (British)"
    if name == "Bolivia":
        name = "Bolivia (Plurinational State of)"
    if name == "Cape Verde":
        name = "Cabo Verde"
    if name == "Cote d'Ivoire":
        name = "Côte d'Ivoire"  
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
    j: int = 0
    code: str = ""
    while j < len(codes):
        if codes[j]['name'] == name:
            code = codes[j]['alpha-3']
        j += 1
    return code

def checkValue (cpm: float):
    global max
    global min
    if cpm > max:
        max = cpm
    if cpm < min:
        min = cpm

# function to parse through mega JSON with all death data
def parse(end_day: str, start_day: str) -> Dict:
    dataList = []
    returnDict: Dict = {}
    i: int = 0
    start_cases: int = 0
    end_cases: int = 0
    fDate: str =  start_day
    while i <= len(data['location']) - 1:
        dataDict: Dict = {} 
        codeDict: Dict = {}
        if str(data['date'][i]) == start_day: 
            start_cases = data['total_cases_per_million'][i] # get cases at specified beginning date
        if str(data['date'][i]) == end_day:
            end_cases = data['total_cases_per_million'][i] # get cases at specified end date
            name = data['location'][i] # get name, country code, cases in specified time
            fDate = getFDate(i - 1, end_day)
            code = getCode(name)
            if code != "":
                try:
                    cases = end_cases - start_cases 
                    if cases < 0:
                        cases = end_cases # if cases less than 0, we don't have enough data. Use total cases instead
                except:
                    cases = 0
                checkValue(cases) 
                dataDict['name'] = name
                dataDict['num'] = cases
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

    #print(finalDict)
    return finalDict

if __name__ == "__main__":
    max: float = 0.0
    min: float = 100.0 # set up max and min variables
    
    url = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/internal/megafile--cases-tests.json")
    text = url.text 
    data = json.loads(text) # read in cases data JSON

    url3 = requests.get("https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json")
    text3 = url3.text
    codes = json.loads(text3) # read in country code data JSON

    finaljson = main()
    dbimport(finaljson, "cases")
