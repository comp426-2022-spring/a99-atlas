# a99 Final Project

## UPDATE

You don't need to accept this assignment since you are already assigned to teams. So, there is not assignment invite link for a99.

## Summary 

COMP426 final project template repository.
All your code and documentation goes here.
Change this text to be a brief description of your final project.
Put the name of your project in the header above.
You will change everything below to be the main technical documentation, as outlined below.

## First steps

Other steps that you will need to take after your team has accepted the assignment:

1. Choose a license and update the LICENSE file accordingly. 
2. Edit this README.md file and use it as the main location of your technical documentation with links out to information contained under `/docs/`.
3. Create a `/docs/` directory for more elaborate documentation of your API, planning notes, etc.
4. Make sure that all of your team members have access to the repository as administrators.
5. Create a project under the **Projects** tab. Use this to manage your planning. Create a To-do list, etc. Explore the tools available and user them to manage your project.
7. Assign team roles and include a listing of those roles in this README.md file or in another file under `/docs/`.
8. Then put your entire development workflow in this repository.
9. Use **Pull requests** to propose changes and incorporate them into your code from various team members. 
10. Use **Issues** to identify and track bugs and also to communicate about various aspects of the project.

## Team mangement

Plan to meet with your team ASAP.
Talk through identifying roles within your team.

Try to figure out what each of you are good at/enjoy doing and try to work out roles that incorporate that.

Some basic roles you will want to consider:

1. A review manager - someone to review pull requests and merge or reject them and manage the related discussions
2. A plan manager - someone to keep an eye on the overall plan and keep the project tab/to-do list up to date
3. A documentation manager - someone to keep the documentation in order and identify what is missing and needs to be documented
4. A release manager - someone to manage the packaging and release process for your prototype package
5. A project manager - someone keeping track of all the moving parts and make sure that everything that needs to happen is happening.
5. Roles for team members to take charge or different parts of the project. Possible roles:
    1. Front end lead
    2. Back end lead
    3. Database lead
    4. Design lead
    5. Etc.

You will notice that there are more roles than people in your group.
That is because you will all be doing a hybrid job of managing a thing while working on other things.

## Check in with instructional staff

Schedule a few times throughout the rest of the semester for your team to check-in with your assigned instructional staff member during their scheduled office hours. 

## Assignment instructions

And that is about all you need to get started.

All the rest of the assignment instructions are available at: https://comp426.johndmart.in/a/99

Good skill and be creative!

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
3. Run **npm test** to ensure the backend can start
    - The server should start, create the databases if not created, listen on port 5555, give a success message, give a 404 message, and then shut down
4. Run **npm start** to start the app (both the backend and frontend)
