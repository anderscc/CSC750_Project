# CSC750_Project

## Objective
    -The goal of this project is to solve the needs of Professors attempting to schedule Graduate and Teaching Assistant Schedules. This software aims to generate schedules that do not have scheduling conflicts and fill the requirements outlined by the instructor.
    -These requirements include: assigning Graduate and Teaching Assignments to classes as needed = Some classes have labs, grading acitivities, and GA/TA's that must be present during class times; ensuring that schedules do not interfere with GA/TA enrolled class times.

This project has two folders

- Client: Holds the [React](https://reactjs.org/docs/getting-started.html) Project
- Server: Holds the [Django](https://docs.djangoproject.com/en/4.1/intro/tutorial01/) Project

## Pre-requisites
- You need to have [Nodejs and NPM](https://nodejs.org/en/download/) installed
- You need to have [Python](https://www.digitalocean.com/community/tutorials/install-python-windows-10) installed
- You need to have a host for a SQL Database - for this project we chose to download XAMPP and install MySql through XAMPP.

## TO START FRONT-END:

Once the project is opened in a code editor (e.g.VS code):
1. Create a new terminal
2. Open the client folder in the terminal. This can be done by entering the command: "cd client" from the root folder
3. User should install NPM -  "npm install"
4. In the terminal, run the command: npm install
5. After run the following command: "npm run start" or "npm start" - to start the front-end of the project

## TO START BACK-END/SERVER:
1. The user should open the host for SQL Database, we use XAMPP as an example. 
2. Click on start for both Apache and MySQL.
3. Ensure that the port numbers for MySQL is 3306. The port numbers for Apache should be 80 and 443.
4. Create your database ‘Scheduler’(Case-Sensitive) in mysql admin
5. Ensure you have created a user that has full permissions to the database. Keep the username and password handy.
6. Create .env  file to store your database information according to .env example file in server folder
7. User should change directories to the server folder: This can be done in the terminal in the root folder using the command: 
```bash
    cd server
```
8. Use following command to install mysqlclient:
```bash
    pip install mysqlclient
```
9. Run the following commands:
```bash
    pip install -r ../requirements.txt
    python manage.py makemigrations
    python manage.py migrate scheduler
    python manage.py runserver
```
10. Confirm in MySQL that 7 tables were created.
11. Confirm at http://127.0.0.1:8000/api that you can successfully post information to the database.


###Now, the project should be available at http://127.0.0.1:3000!