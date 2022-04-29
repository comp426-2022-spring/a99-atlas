import sqlite3
import json

def dbimport(finaljson, tabletype):
    conn = sqlite3.connect('database/atlas.db')
    c = conn.cursor()
    if tabletype == "cases":
        for time in finaljson:
            jsonload = json.dumps(finaljson[time])
            c.execute("INSERT INTO cases VALUES (?, ?)",[time, jsonload])
            conn.commit()
    elif tabletype == "deaths":
        for time in finaljson:
            jsonload = json.dumps(finaljson[time])
            c.execute("INSERT INTO deaths VALUES (?, ?)",[time, jsonload])
            conn.commit()
    elif tabletype == "vacc":
        for time in finaljson:
            jsonload = json.dumps(finaljson[time])
            c.execute("INSERT INTO vaccinations VALUES (?, ?)",[time, jsonload])
            conn.commit()

    conn.close()