import styles from './App.module.css';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path='/' render={() => <h1>Home Page</h1>} />
          <Route exact path='/signin' render={() => <h1>Sign In</h1>} />
          <Route exact path='/profile' render={() => <h1>Profile</h1>} />
          <Route exact path='/popular' render={() => <h1>Popular</h1>} />
          <Route exact path='/feed' render={() => <h1>Feed</h1>} />
          <Route exact path='/spotify-search' render={() => <h1>Spotify Search</h1>} />
          <Route exact path='/placeholder' render={() => <h1>Placeholder</h1>} />
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;