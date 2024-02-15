import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import SpotifySearchPage from './spotify/SpotifySearchPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import AccordionWindow from './components/AccordionWindow';
import ProfilePage from './pages/ProfilePage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetail from './pages/PlaylistDetail';
import PlaylistEditForm from './forms/PlaylistEditForm';
import ProfileEditForm from './forms/ProfileEditForm';
import '@smastrom/react-rating/style.css';
import PageNotFound404 from './pages/PageNotFound404';
import Homepage from './pages/Homepage';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.pk || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <AccordionWindow />
      <Switch>
        <Route exact path='/' render={() => <Homepage />} />
        <Route exact path='/signin' render={() => <SignInForm />} />
        <Route exact path='/signup' render={() => <SignUpForm />} />
        <Route exact path='/profile/:userId' render={() => <ProfilePage />} />
        <Route
          exact
          path='/profile/:userId/edit'
          render={() => <ProfileEditForm />}
        />
        <Route
          exact
          path='/rated-playlists'
          render={() => (
            <PlaylistsPage
              pageName='Your Rated Playlists'
              filter={`ratings__owner__profile=${profile_id}`}
            />
          )}
        />
        <Route exact path='/playlist/:id' render={() => <PlaylistDetail />} />
        <Route
          exact
          path='/playlist/:id/edit'
          render={() => <PlaylistEditForm />}
        />
        <Route
          exact
          path='/feed'
          render={() => (
            <PlaylistsPage
              pageName='Followed Users'
              filter={`owner__followed_by__owner__profile=${profile_id}`}
            />
          )}
        />
        <Route
          exact
          path='/spotify-search'
          render={() => <SpotifySearchPage />}
        />
        <Route
          exact
          path='/global'
          render={() => <PlaylistsPage pageName='All Playlists' />}
        />
        <Route render={() => <PageNotFound404 />} />
      </Switch>
    </div>
  );
}

export default App;
