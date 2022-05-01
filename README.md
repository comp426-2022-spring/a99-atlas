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
This project is a functional website that displays historical COVID-19 per-capita statistics on an interactive world-map. The shading of the world-map is dependent on the data values' associated with each country. For example, if a country has high vaccination rates relative to other countries, it will appear darker on the world map. Statistics displayed by our program include cases, deaths, and vaccination data at 4 different time intervals (all time, last 1 year, last 6 months, and last 30 days). We pulled all our data from regularly updated json files listed under this public GitHub repository: https://github.com/owid/covid-19-data/tree/master/public/data. An example visualization by Our World In Data, the collectors of this data, can be found here: https://ourworldindata.org/covid-cases.

When launching the app, the server creates the database if not already present, runs three python scripts to get the open source Covid data and store it in the database, and finally starts servering at port 5555 -- the API endpoints and their descriptions can be found at './docs/endpoints.txt'. The frontend is then servered at http://localhost:3000/ and the user is met with a login modal that requires that you either sign-in or sign-up with an email and password before accessing the app. After authentication is successful, you may interact with the map and change the data you view using the dropdowns at the top of the UI. All of the data is up to date based on when you started the server and it is fetched from the backend database each time you change the dropdowns. You can also look at your account details by pressing the "Account" button, which will fetch your email from the database. On the Accounts modal, you can update your password and delete your account.

## How to Run:
1. First ensure you have python3 and pip3 installed along with the latest versions of node and npm
2. Run **npm install** to install all packages and dependencies for the entire app
    - Make sure you have pip3 in your PATH so the python requirements will be installed as well
3. Run **npm test** to ensure the backend can start. The following should occur:
    1. The server should start, create the database if not present, and start listening on port 5555
    2. The frontend should open up and be served on port 3000 in a web browers
    3. After 8 seconds since running npm test, the server should gracefully terminate with a success message and the frontend should stop as well
4. Run **npm start** to start the app (both the backend and frontend)

## Project File Organization:
The repo is organized into a frontend and a backend directory, each with their own package.json.

### The Frontend:
The frontend, located in the './frontend/project-atlas' directory, is a React app that has it's code mainly in the 'src' directory. Within the src directory, the "./index.js" is the starting point for the app, which then loads the data from "App.js", the base of the UI. App.js loads several components located in the './components' directory. These components are built using the React Simple Maps and Material UI packages for UI development. 

### The Backend:
The backend, located in the './backend' directory, contains several directories and index.js. The "controllers" directory contains 3 pythons scripts to fetch covid data from the open source github repo (more info in './docs/backend_info.txt'). The "database" directory contains a scripts to create a user database and logging database and is where the 'atlas.db' file is generated. The "routes" directory contains a file called "userroutes.cjs", which contains all the API routes that the frontend queries. Finally, index.js is the starting point for the backend and is what starts the server, creates the databases, and hosts it on the specified port.

## Installation Requirements:
### Back-end packages used:
1. **python3 (requirement)**
2. express
3. minimist
4. cookie-parse
5. body-parser
6. morgan
7. crypto
8. better-sqlite3
9. sqlite3
10. cors
11. nanoid

### Front-end packages used:
1. React
2. Material UI
3. React Simple Maps
