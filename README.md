# a99 Final Project

## Notes:
### Roles:
1. Review Manager: Kush, Liam
2. Project Manager: Kush
3. Plan Manager: Kunal
4. Documentation Manager: Kunal
5. Release Team: Kush, Liam, Kunal, Nathan, Kaan
6. Front-end Lead: Kush
7. Back-end Lead: Nathan
8. Database Lead: Liam
9. Testing Team: Nathan, Kaan
10. Miscellaneous Lead: Kaan
11. Research Team: Kaan, Liam, Nathan

## Project Description:
This project is a functional website that displays historical COVID-19 per-capita statistics on an interactive world-map. The shading of the world-map is dependent on the data values' associated with each country. For example, if a country has high vaccination rates, it will appear darker on the world map. Statistics displayed by our program include cases, deaths, and vaccination data. We pulled all our data from regularly updated json files listed under this public GitHub repository: https://github.com/owid/covid-19-data/tree/master/public/data. An example visualization by Our World In Data, the collectors of this data, can be found here: https://ourworldindata.org/covid-cases.

### Installation Requirements:
Back-end packages used:
1. express
2. minimist
3. cookie-parse
4. body-parser
5. morgan
6. crypto
7. better-sqlite3
8. sqlite3
9. **python3 (requirement)**
10. cors
11. nanoid

Front-end packages used:
1. React
2. Material UI
3. React Simple Maps

### How to Run:
1. First ensure you have python3 and pip3 installed along with the latest versions of node and npm
2. Run **npm install** to install all packages and dependencies for the entire app
3. Run **npm test** to ensure the backend can start. The following should occur:
    1. The server should start, create the database if not present, and start listening on port 5555
    2. The frontend should open up and be served on port 3000 in a web browers
    3. After 8 seconds since running npm test, the server should gracefully terminate with a success message and the frontend should stop as well
4. Run **npm start** to start the app (both the backend and frontend)
