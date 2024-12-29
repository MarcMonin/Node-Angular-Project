# Node and React Development Project

## GitHub link to the repository: 
https://github.com/MarcMonin/Node-Angular-Project 

## Class:
CDOF1

## Team Members: 
Marc Monin - GitHub: MarcMonin

Noémie Mazepa - GitHub: Noemiemz

Ariste Mathiot - GitHub: ariste974

Lorrain Morlet - GitHub: Nasotro

## Table of Content
- [Project Summary](#Project-Summary)
- [Page Scheme](#Pages-Scheme)
- [Page Description](#Description-of-each-page)
- [Backend Description](#Backend-Description)
- [User Guide](#User-Guide)

  
## Project Summary:
A weather app to check the current weather and forecasts for any city.
The app provides real-time data on temperature, wind, humidity, and rain  but also charts to display the forecasts. 
It is also possible to save your favorite cities for a quicker access.

### Must include :
- Search for cities.
- Show weather details like temperature, wind, humidity, and rain.
- Weekly and daily forecasts with charts (Highcharts).
- Save favorite cities.

### Secondary needs : 
- User login to manage the user's favorite cities.
- About/Help page with some info about the app.
- Settings page.


## Pages scheme
```mermaid
graph TD
    A[Home Page] --> C[User Authentication Page]
    H --> B[Account lobby]
    O --> F[ag-Grid Screen]
    M --> F
    O --> G[HighCharts Screen]
    M --> G
    C --> H[Login]
    C --> I[Register]
    I --> H
    B --> O[City Selector]
    B --> M[Favorite cities]
```

## Description of each page

### Login
The login page allows already existing users to connect to their account by entering ther email and password. If they are not already registered in the database, they can access the Register page through the register button.
<br>
<div align="center">
    <img src="images/login.png" alt="login">
</div>

### Register
The registration page allows new users to create an account. To do this, they need to give their first and last name, their email and their password. 
Once they are registered, the new user can log in to have access to a new feature: being able to save their favorite cities. It also features a button to go back to the login page.
<br>
<div align="center">
    <img src="images/register.png" alt="register">
</div>

### Main weather page
This page is the first page of our app. There are several buttons that make us access different other pages in the website. First we have the "Current Weather" button that will direct to the page where we can check current weather details for any city we want. Then, there is the "Weather Forecast" button that directs us to the page where we can see forecasts for any city we want. Then as written, to have the possibility to add cities as favorite, the user needs either to Login or Register. These 2 buttons direct us to forms we need to fill.
<br>
<div align="center">
    <img src="images/main%20page.png" alt="main page">
</div>


### Current weather page
This page has a search bar where we can type in any city we want. When we click on the get weather button, we can see a lot of different weather details about the city like the temperature, the wind, the clouds coverage, etc. We can search as much as we want.
<br>
<div align="center">
    <img src="images\Weather for paris.png" alt="current weather page">
</div>

### Forecast page
This page gives weather forecasts for a specific cities with Highcharts. The user can select up to 3 cities for which the weather will be predicted. Then, the user has access to 2 charts, the first one being the forecast for the next 24 hours and the second one being the forecast for the next 5 days
<br>
<div align="center">
    <img src="images/forecast%203%20cities%201.png" alt="forecast 1">
    <br>
    <img src="images/forecast%203%20cities%202.png" alt="forecast 2">
</div>


### Favorite page
This page lists all of the cities that were saved as favorite by the user so they can have a quick acces to them. We used AG-Grid to do that and the user can sort their favorite cities by name, temperature, wind, etc. They can also remove any city they want from the list.
<br>
<div align="center">
    <img src="images/all%20favorites.png" alt="favorites">
</div>

### User page
When a user is logged in, they have access to this page where they can add favorite cities and preview some weather details. Then they can access their favorite list and view the forecasts. if they click on any of the cities, it directs them to the current weather page.
<br>
<div align="center">
    <img src="images\home 1.png" alt="user page 1">
    <br>
    <img src="images\home 2.png" alt="user page 2">
</div>

## Backend Description
First, we used MySQL to create and store our users and their favorite cities. The backend is connected to this Database and thus compiling the website might work for any other person than us. To use the database from MySQL, we need to give a username and a password as well as the host IP address and the name of our database.
We created some CRUD requests to retrieve the data from MySQL and also modify it. This way we can add users to the database.

For the weather part, we used to APIs: openweathermap and openmeteo. We use their key and extract data from thos APIs with GET requests.

Finally, we used Swagger UI to view and test our CRUD routes with the /api-docs http address. We also used Postman for some time.



## User Guide

This is a comprehensive guide to make the app work on any device.

### Requirements :
-Node.js\
-Npm (usually installed along node.js)\
-Angular framework (use command npm install -g @angular/cli)\
-MySQL\
-A working IDE (it can work off visual studio code or other text editors but we recommend Intellij for ease of use)

### Setup :

The first step is downloading the github repository. You can do it either as a zip or using git clone if you have git installed.\
Open it in the IDE and install the node modules (if you chose Intellij, it should be proposed automatically otherwise you might have to do it manually (npm install))\
**The Front-end should now work**, feel free to open it using the start command that can be found in package.json of the front end\
To make the Back-end work we will need to setup a database in MySQL.\
Open MySQL Workbench create a connection. Ensure that the connection has the following parameters, host:127.0.0.1, user:root, password:root.\
Link your IDE with MySQL.\
Run the init.sql file (there might be errors with the first line due to the weather_login database not yet existing, feel free to remove this line if need be)\
Now that the database is setup, all that is left is to run the the Back-end\
Run the following commands :\
-"tsc" to create a .js duplicate of the .ts files in a dist directory\
-"node dist/app.js" to run the backend\
**The Back-end should now work**\
Now all that is left is to open the app by typing "http://localhost:4200/"  \
Have fun !

### Usage
*This is the same as the video available in the files*

When you open the app, you initially arrive at the home page.\
From there you have 4 options :\
-Opening the Weather page\
-Opening the Forecast page\
-Opening the Login page\
-Opening the Register page

The Weather page allows to select a city and see its detailed weather information\
The Forecast page lets you choose up to 3 cities by typing their names and see the forecast over the next 24 hours and over the next 5 days\

If you wish to login, you initially need to register by giving a surname, last name, email and password. The page will then automatically redirect you to the login page\
Once you have logged in, you gain access to the account lobby, where you can choose favorite cities to see brief weather information. The advantage of logging in is the ability to have your favorite cities retained by the app the next time you open it.\


## Links used for Research and Help during this project:
High Charts: https://codepen.io/pen?&prefill_data_id=325529a3-52ee-4202-b6fc-997aceac62f7 https://www.highcharts.com/demo/highcharts/line-labels


Open Weather Map API: https://openweathermap.org/api 
https://openweathermap.org/current
https://www.youtube.com/watch?v=14MDWUXYYEM&ab_channel=Elio-GeeZMoKeZ 

Open Meteo API: https://open-meteo.com/en/docs/historical-weather-api
