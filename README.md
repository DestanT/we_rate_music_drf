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
      <li>[AccordionWindow](#accordionwindow)</li>
      <li>[Avatar](#avatar)</li>
      <li>[LoadingSpinner](#loadingspinner)</li>
	  <li>[ModalWindow](#modalwindow)</li>
	  <li>[NavBar](#navbar)</li>
	  <li>[Playlist](#playlist)</li>
	  <li>[Profile](#profile)</li>
	  <li>[SearchBar](#searchbar)</li>
	  <li>[SignOutButton](#signoutbutton)</li>
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

Django Rest Framework API serves as the backend to the React frontend application. The API endpoints were designed with the user stories for the whole project in mind, which can be found [here](LINK). PostgreSQL manages the databases and serves the data.

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

### /API

#### /spotifyApi

##### searchForItem
- search query
- search type

#### Axios
- talk about /api/axiosDefaults.js file
- Credit to CI moments walkthrough

### /Components

#### AccordionWindow
- The Accordion Window component expands automatically when a user interacts by clicking/pressing on a playlist by setting the default active key value to the event key value

#### Avatar
- Takes in the props for the image source and height
- height is defaulted at 45
- displays the users profile image in an avatar

#### LoadingSpinner
- The loading spinner component holds a spinning Font Awesome icon
- is used in ternaries while data fetching or other like actions are happening the loading spinner will be rendered to give users feedback, that their request has been heard and is being handled

#### ModalWindow
- The modal window component takes in props for title, body, onHide and onConfirm.
- title: title for the modal
- body: text/image to display in the main body of the modal
- onHide: takes on the [setShowModal(false)] state from the component the modal lives in
- every component that uses the ModalWindow component is expected to use 'const [showModal, setShowModal] = useState(false)'
- onConfirm: whatever the primary function the user intended to run before the confirmation modal needed to be triggered is placed inside the onConfirm prop of the modal.

#### NavBar
- will change based on user login status

#### Playlist
- in essence very similar to the Avatar component, in that it will display the image of a playlist/album.
- also takes in the title prop, only used in the alt attribute for screen readers

#### Profile
- fetchProfileData function:
 - using the userId prop will fetch the profile data from the backend
 - sets the profile data in a state of the component
 - has a cleanup function that uses axios.CancelToken.source() to cancel the asynchronous request, should the component unmount early.
 - this was esspecially important as the Profile component is on the SpotifySearchPage where the user is redirected for authorisation on Spotify, when being directed back to the app a memory leak warning would make the app crash.
 - displays the followers count, following count, playlists and number of ratings given

#### SearchBar
- takes a function as a prop
- displays a search bar

#### SignOutButton
- makes a post request to dj-rest-auth/logout
- allows users to sign out of the application
- ModalWindow component incorporated

### /Contexts

#### CurrentUserContext
- Credit: CI walkthrough project
- will store the current user's information and provide it to the rest off the App.

#### SpotifyIframeContext
- stores spotify playlists' uri, which is used in the iFrame player
- the reason it is used as a global context is so that the user can be anywhere in the app and still continue listening to the playlist they had originally clicked on
- everytime user clicks on different playlist the context is updated with the new uri

### Spotify

#### AddPlaylistButton
- displays a button that prompts a confirmation modal and ultimately sends a post request to the drf api to the playlists/ endpoint

#### SpotifyPlayer
- This is the Spotify iFrame player
- https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
- Uses a Uniform Resource Identifier for each playlist/album/podcast etc from Spotify.
- The application saves this URI to the database along with other parameters

#### SpotifySearchPage
- last search is stored in local storage as stringified JSON for better UX
- handleSearch:
 - checks for empty search field and throws error alert if so
 - 

#### useSpotifyAuth
- Authentication and access token
- refresh token logic

### /Pages

#### /Auth

##### SignInForm
- more or less direct copies of CI moments walkthrough
- uses setCurrentUser from the CurrentUserContext hook
- talk about redirection after login
- alerts
  - username incorrect
  - password incorrect
  - talk about errors.non_field_errors              

##### SignUpForm
- more or less direct copies of CI moments walkthrough
- uses state to send axios.post request to dj-rest-auth’s /registration endpoint.
- alerts
  - username taken/no allowed
  - password mismatch
  - not strong enough password
  - talk about errors.non_field_errors
  - redirected to sign in page after successful signup.
  
#### /Playlists

##### PlaylistsPage
- logic to display playlist components
- is used in feed, profile view, and spotify search page

##### SpotifySearchPage
- used in spotify search page
- displays playlist components
NOTE: consider possible merge with PlaylistsPage!

### /Styles
- all the module.css files for custom css

### /Utils

#### spotifyAuthUtils
- code verifier logic
- code challenge logic
- copied from Spotify Developer documentation

## Development
Installation of DRF:
- 'git clone <my-project-url>'
- cd 'my-project'
- 'pip install -r requirements.txt'
- 'python manage.py runserver'
- 'nvm install 16 && use 16'
- 'npm start' 

## Frontend React Application

### Spotify API
used Spotify Developer Web API documentation, more specifically the "Authorization Code with PKCE Flow" found [here](!https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow) was used.
- users login to their spotify accounts and authorize the application
- the application requires the user to accept:
  - scope vars
  - scope vars
  - scope vars
- user can add a playlist from their spotify account to display on the app
- other users can interact with playlists in the app by rating them


NOTES:
aria-label='screen-reader label' > add this prop to buttons and like components


NOTABLE FIXES:
SpotifySearchPage > leads user to authentication page and back > and async functions threw a warning: Can’t perform a React state update on an unmounted component > which led to abortControllers and cleanup functions. Another issue was axios required CancelToken (which is deprecated as of v0.22.0 (using v0.21.4) didn’t want to upgrade version at this point just in case. Opted to use old cancel request function.
