from typing import Dict
from datetime import date
from dateutil.relativedelta import relativedelta
from importdata import dbimport
import requests, json

def checkValue (vpm: float):
    global max
    global min
    if vpm > max:
        max = vpm
    if vpm < min:
        min = vpm


def parse(days: int) -> Dict:
    global date
    return_dict: Dict = {}
    data_list = []
    for i in range(len(data)):
        data_dict: Dict = {}
        codeDict = {}
        if len(str(data[i]['iso_code'])) == 3:
            j = days
            k = len(data[i]['data']) - 1
            fDate = data[i]['data'][0]['date']
            while True:
                try:
                    if k < 0:
                        raise IndexError
                    start_vax = data[i]['data'][k]['total_vaccinations_per_hundred']
                    break
                except IndexError:
                    start_vax = 0
                    break
                except KeyError:
                    k -= 1

            while True:
                try:
                    if j < 0:
                        raise IndexError
                    oldvax = data[i]['data'][j]['total_vaccinations_per_hundred']
                    break
                except IndexError:
                    oldvax = 0
                    break
                except KeyError:
                    j -= 1
            vax = start_vax - oldvax
            # if days == 0:
            #     vax = data[i]['data'][len(data[i]['data']) - 1]['total_vaccinations_per_hundred']
            country = data[i]['country']
            countryCode = data[i]['iso_code']
            checkValue(vax)
            data_dict['name'] = country
            data_dict['num'] = vax
            data_dict['reportDate1'] = fDate
            codeDict[countryCode] = data_dict
            data_list.append(codeDict)

    return_dict['min'] = min
    return_dict['max'] = max
    return_dict['data'] = data_list
    return return_dict

def main() -> Dict:

    finalDict: Dict = {}
    global min
    global max
    
    # end_day = date.today() - relativedelta(days=2)
    # start_day = "Beginning"
    days = 0
    finalDict['allTime'] = parse(days)

    max = 0.0 # reset min and max after every new parsing data call
    min = 100.0

    days = 365
    finalDict['lastYear'] = parse(days)

    max = 0.0
    min = 100.0

    days = 183
    finalDict['last6Months'] = parse(days)

    max = 0.0
    min = 100.0

    days = 30
    finalDict['last30Days'] = parse(days)
    print(finalDict)
    return finalDict

if __name__ == "__main__":
    max: float = 0.0
    min: float = 100.0 # set up max and min variables
    
    url = requests.get("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json")
    text = url.text 
    data = json.loads(text) # read in vaccine data JSON
    main()
