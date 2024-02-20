import { Route, Switch } from 'react-router-dom';
import { useCurrentUser } from './contexts/CurrentUserContext';
import './api/axiosDefaults';

import NavBar from './components/NavBar';
import AccordionWindow from './components/AccordionWindow';

import Homepage from './pages/Homepage';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import ProfilePage from './pages/ProfilePage';
import ProfileEditForm from './forms/ProfileEditForm';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetail from './pages/PlaylistDetail';
import PlaylistEditForm from './forms/PlaylistEditForm';
import SpotifySearchPage from './spotify/SpotifySearchPage';
import FeedbackCreateForm from './forms/FeedbackCreateForm';
import PageNotFound404 from './pages/PageNotFound404';

import '@smastrom/react-rating/style.css';
import styles from './App.module.css';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <AccordionWindow />
      <Switch>
        <Route exact path='/' render={() => <Homepage />} />
        <Route exact path='/signin' render={() => <SignInForm />} />
        <Route exact path='/signup' render={() => <SignUpForm />} />
        <Route
          exact
          path='/global'
          render={() => <PlaylistsPage pageName='All Playlists' />}
        />
        <Route
          exact
          path='/feed'
          render={() => (
            <PlaylistsPage
              pageName='Playlists of Followed Users'
              filter={`owner__followed_by__owner__profile=${profile_id}`}
            />
          )}
        />
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
              pageName='All Playlists You Have Rated'
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
          path='/spotify-search'
          render={() => <SpotifySearchPage />}
        />
        <Route
          exact
          path='/feedback/create'
          render={() => <FeedbackCreateForm />}
        />
        <Route render={() => <PageNotFound404 />} />
      </Switch>
    </div>
  );
}

export default App;
