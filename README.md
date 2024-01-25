# We Rate Music

## Project Goals
- Talk about combining both DRF and React
- Bringing users together
- Intentions for the future

{IMAGE HERE}

## Table of Contents
1. [Planning](#planning)
  - [User Stories](#user-stories)
  - [Wireframes](#wireframes)
  - [Database Modeling](#database-modeling)
  - [Agile Development](#agile-development)
<details>
  <summary>Django Rest Framework</summary>
  <br>
  <ul>
    <li>[Database Modeling](#database-modeling)</li>
    <ul>
      <li>[Profile](#profile)</li>
      <li>[Playlist](#playlist)</li>
      <li>[Rating](#rating)</li>
      <li>[Follower](#follower)</li>
    </ul>
    <li>[API Endpoints](#api-endpoints)</li>
  </ul>
</details>
<details>
  <summary>[Frontend React Application](#front-end-react-application)</summary>
  <br>
  <ul>
    <li>[Components & Features](#components—features)</li>
    <ul>
      <li>[Component 1](#component-1)</li>
      <li>[Component 2](#component-2)</li>
      <li>[Component 3](#component-3)</li>
    </ul>
  </ul>
</details>
2. [Future Features/Roadmap](#future-featuresroadmap)
3. [Testing](#testing)
   - [Lighthouse Testing](#lighthouse-testing)
   - [W3C Markup Validation](#w3c-markup-validation)
   - [W3C CSS Validation](#w3c-css-validation)
   - [JS Hint](#js-hint)
   - [Pylint-Django](#pylint-django)
   - [Automated Testing](#automated-testing)
   - [Manual Testing](#manual-testing)
4. [Challenges & Bugs](#challenges—bugs)
5. [Technologies Used](#technologies-used)
  - [Frameworks, libraries, and dependencies](#frameworks—libraries—and-dependencies)
6. [Deployment](#deployment)
7. [Creating the Heroku app](#creating-the-heroku-app)
8. [Development](#development)
9. [Credits](#credits)

## Planning

### User Stories

### Wireframes

### Database Modeling

### Agile Development

## Django Rest Framework

### Database Modeling

The database for this project is a PostgreSQL database. The database is made up of five models: User and Profile.

#### User Model

The user model is a default model provided by Django all-auth. It includes the following fields:

- username
- password
- email

#### Profile Model

The profile model is a custom model that extends the default user model. It includes the following fields:

- ‘owner’: OneToOneField with the User model
- ‘created_at’: Automatically generated DateTimeField
- ‘image’: ImageField to store the user’s profile picture to Cloudinary
- ‘background’: ImageField to store the user’s profile background to Cloudinary

##### Profile Serializer

The seria 

#### Playlist Model

#### Rating Model

#### Follower Model

### API Endpoints

## Frontend React Application

### Components & Features

#### NavBar
- will change based on user login status

### Contexts

#### CurrentUserContext
- Credit: CI walkthrough project
- will store the current user's information and provide it to the rest off the App.

### API

#### Axios
- talk about /api/axiosDefaults.js file
- Credit to CI moments walkthrough

### Pages

#### SignInForm
- more or less direct copies of CI moments walkthrough
- uses setCurrentUser from the CurrentUserContext hook
- talk about redirection after login
- alerts
  - username incorrect
  - password incorrect
  - talk about errors.non_field_errors              

#### SignUpForm
- more or less direct copies of CI moments walkthrough
- uses state to send axios.post request to dj-rest-auth’s /registration endpoint.
- alerts
  - username taken/no allowed
  - password mismatch
  - not strong enough password
  - talk about errors.non_field_errors
  - redirected to sign in page after successful signup.