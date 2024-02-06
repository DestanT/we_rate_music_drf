import styles from './App.module.css';
// import logo from './logo.svg';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import SpotifySearchPage from './pages/playlists/SpotifySearchPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import AccordionWindow from './components/AccordionWindow';
import ProfilePage from './pages/ProfilePage';
import PlaylistsPage from './pages/playlists/PlaylistsPage';
import PlaylistDetail from './pages/playlists/PlaylistDetail';

function App() {
  const currentUser = useCurrentUser();
  const profile_username = currentUser?.username || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <AccordionWindow />
      <Switch>
        <Route exact path='/' render={() => <h1>Home Page</h1>} />
        <Route exact path='/signin' render={() => <SignInForm />} />
        <Route exact path='/signup' render={() => <SignUpForm />} />
        <Route exact path='/profile/:userId' render={() => <ProfilePage />} />
        <Route exact path='/popular' render={() => <PlaylistsPage />} />
        <Route exact path='/playlist/:id' render={() => <PlaylistDetail />} />
        <Route exact path='/feed' render={() => <h1>Followed Users</h1>} />
        <Route
          exact
          path='/spotify-search'
          render={() => <SpotifySearchPage />}
        />
        <Route exact path='/placeholder' render={() => <h1>Placeholder</h1>} />
        <Route render={() => <h1>Page Not Found!</h1>} />
      </Switch>
    </div>
  );
}

export default App;
