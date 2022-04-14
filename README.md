<div align="center">

  <h1>Health App</h1>
  
  <p>
    Sample fullstack project 'health-app' with user login, profile creation + appointment booking. 
    <br>
    Built with React, Material UI, GraphQL, Apollo Server, Mongoose + MongoDB!
  </p>
  
  
<!-- Badges -->
<p>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/homeworkmon/health-app" alt="last update" />
  </a>
</p>
   
<h3>
    <a href="https://health-app-homeworkmon.herokuapp.com/">:star2:Live Demo</a>
</h3>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Screenshots](#camera-screenshots)
  * [Tech Stack](#space_invader-tech-stack)
  * [Features](#dart-features)
  * [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  * [Run Locally](#running-run-locally)
  * [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project


<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
  <img src="https://github.com/homeworkmon/health-app/blob/main/assets/login.PNG/?raw=true" alt="screenshot-login" />
</div>
<div align="center"> 
  <img src="https://github.com/homeworkmon/health-app/blob/main/assets/profile.PNG/?raw=true" alt="screenshot-login" />
</div>
<div align="center"> 
  <img src="https://github.com/homeworkmon/health-app/blob/main/assets/appointments.PNG/?raw=true" alt="screenshot-login" />
</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://mui.com/">Material UI</a></li>
    <li><a href="https://date-fns.org/">Date-Fns</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://graphql.org/">GraphQL</a></li>
    <li><a href="https://www.npmjs.com/package/apollo-server-express">Apollo-Server-Express</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://mongoosejs.com/docs/index.html">Mongoose</a></li>
    <li><a href="https://www.mongodb.com/atlas/database">MongoDB Atlas</a></li>
  </ul>
</details>

<!-- Features -->
### :dart: Features

- native user creation with bcrypt 
- user login with tokens supported by jsonwebtoken
- health profile creation with form validation of birthdate, phone number, Canadian postal code and Ontario health card format
- appointment booking multi-step form with no double booking of existing appointments in database
- appointment deletion
- correct server-side error handling
- responsive web design for mobile

<!-- Env Variables -->
### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`JWT_SECRET`

`PORT`

<!-- Getting Started -->
## 	:toolbox: Getting Started


<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/homeworkmon/health-app
```

Go to the project directory

```bash
  cd health-app
```

Install dependencies for both frontend and backend folders separately ie.

```bash
  cd frontend
  npm install
```
Start the client

```bash
  npm start
```

Start the server in development mode

```bash
  npm run dev
```

<!-- Deployment -->
### :triangular_flag_on_post: Deployment

Change frontend HttpLink URI in Index.js to relative path

```js script
  const httpLink = new HttpLink({ uri: '/graphql' })
```
Run build script in frontend (ensure file structure is the same or modify the script in package.json)

```bash
  npm run deploy
```
Deploy only the backend folder with static frontend build page to platform of your choice

<!-- Usage -->
## :eyes: Usage

The idea for this project was to use my full stack knowledge especially GraphQL. 
I decided on a fairly simple concept of an app that a health care provider could use for patients to save their personal health information and book or cancel upcoming appointments with a hardcoded list of health care providers.


<!-- Contact -->
## :handshake: Contact

Monica M - [LinkedIn](https://linkedin.com/in/monica-e-mason) - monica.emma.mason@gmail.com

Project Link: [https://github.com/homeworkmon/health-app](https://github.com/homeworkmon/health-app)


<!-- Acknowledgments -->
## :pray: Acknowledgements

I learned and integrated skills from these resources for this project:

 - [@CodAffection Material UI form validation](https://github.com/CodAffection/Material-UI-Form-Design-and-Validation)
 - [@CodAffection React Material UI Table Paging, Sorting and Filtering](https://github.com/CodAffection/React-Material-UI-Table-Paging-Sorting-and-Filtering)
 - [CSS Tricks React-Based Multi-Step Forms](https://css-tricks.com/the-magic-of-react-based-multi-step-forms/)
 - [University of Helsinki's Full Stack Open 2021 curriculum](https://fullstackopen.com/en/#course-contents)
 - [@Louis3797 awesome-readme-template](https://github.com/Louis3797/awesome-readme-template)
