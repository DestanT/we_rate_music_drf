import styles from '../styles/NavBar.module.css';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import {
  faStar,
  faPeopleGroup,
  faUserPlus,
  faRightToBracket,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedOutIcons = (
    <>
      <Navbar.Brand className={styles.Brand} href='/'>
        We -R- Music
      </Navbar.Brand>
      <Nav className={styles.SignInOut}>
        <NavLink
          className={styles.SignUpIn}
          activeClassName={styles.Active}
          to='/signin'
        >
          {/* Signin icon */}
          <FontAwesomeIcon
            className={styles.MarginRight}
            icon={faRightToBracket}
            size='2xl'
          />
          Login
        </NavLink>
        <NavLink
          className={styles.SignUpIn}
          activeClassName={styles.Active}
          to='/signup'
        >
          {/* Signup icon */}
          <FontAwesomeIcon
            className={styles.MarginRight}
            icon={faUserPlus}
            size='2xl'
          />
          Sign Up!
        </NavLink>
      </Nav>
    </>
  );
  const loggedInIcons = (
    <>
      <Nav className='mr-auto'>
        <NavLink activeClassName={styles.Active} to='/global'>
          {/* All playlists */}
          <FontAwesomeIcon icon={faGlobe} size='2xl' />
        </NavLink>
      </Nav>

      <Nav className='mr-auto'>
        <NavLink activeClassName={styles.Active} to='/feed'>
          {/* Followed user playlists */}
          <FontAwesomeIcon icon={faPeopleGroup} size='2xl' />
        </NavLink>
      </Nav>

      <Nav>
        <NavLink
          activeClassName={styles.ProfileActive}
          to={`/profile/${currentUser?.profile_id}`}
        >
          {/* User's profile */}
          <Avatar src={currentUser?.profile_image} height={40} />
        </NavLink>
      </Nav>

      <Nav className='ml-auto'>
        <NavLink activeClassName={styles.Active} to='/rated-playlists'>
          {/* User's rated playlists */}
          <FontAwesomeIcon icon={faStar} size='2xl' />
        </NavLink>
      </Nav>

      <Nav className='ml-auto'>
        <NavLink to='/spotify-search'>
          {/* Spotify search page */}
          <FontAwesomeIcon
            icon={faSpotify}
            style={{ color: '#1db954' }}
            size='2xl'
          />
        </NavLink>
      </Nav>
    </>
  );

  const navBarPosition = currentUser ? 'bottom' : 'top';

  return (
    <Navbar className={styles.NavBar} expand='md' fixed={navBarPosition}>
      <Container>{currentUser ? loggedInIcons : loggedOutIcons}</Container>
    </Navbar>
  );
};

export default NavBar;
