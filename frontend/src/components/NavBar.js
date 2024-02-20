import React from 'react';
import { NavLink } from 'react-router-dom';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import {
  faStar,
  faPeopleGroup,
  faUserPlus,
  faRightToBracket,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedOutIcons = (
    <>
      {/* Brand logo */}
      <OverlayTrigger
        placement='bottom'
        overlay={<Tooltip id='feedback-tooltip'>Home</Tooltip>}
      >
        <Navbar.Brand className={styles.Brand} href='/'>
          We -R- Music
        </Navbar.Brand>
      </OverlayTrigger>

      <Nav className={styles.SignInOut}>
        {/* Login button */}
        <OverlayTrigger
          placement='bottom'
          overlay={<Tooltip id='feedback-tooltip'>Click to Login</Tooltip>}
        >
          <NavLink
            className={styles.SignUpIn}
            activeClassName={styles.Active}
            to='/signin'
          >
            <FontAwesomeIcon
              className={styles.MarginRight}
              icon={faRightToBracket}
              size='2xl'
            />
            Login
          </NavLink>
        </OverlayTrigger>

        {/* Signup button */}
        <OverlayTrigger
          placement='bottom'
          overlay={<Tooltip id='feedback-tooltip'>Click to sign up!</Tooltip>}
        >
          <NavLink
            className={styles.SignUpIn}
            activeClassName={styles.Active}
            to='/signup'
          >
            <FontAwesomeIcon
              className={styles.MarginRight}
              icon={faUserPlus}
              size='2xl'
            />
            Sign Up!
          </NavLink>
        </OverlayTrigger>
      </Nav>
    </>
  );
  const loggedInIcons = (
    <>
      {/* All playlists */}
      <Nav className='mr-auto'>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip id='feedback-tooltip'>All playlists</Tooltip>}
        >
          <NavLink activeClassName={styles.Active} to='/global'>
            <FontAwesomeIcon icon={faGlobe} size='2xl' />
          </NavLink>
        </OverlayTrigger>
      </Nav>

      {/* Followed user playlists */}
      <Nav className='mr-auto'>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip id='feedback-tooltip'>Followed user feed</Tooltip>}
        >
          <NavLink activeClassName={styles.Active} to='/feed'>
            <FontAwesomeIcon icon={faPeopleGroup} size='2xl' />
          </NavLink>
        </OverlayTrigger>
      </Nav>

      {/* User's profile */}
      <Nav>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip id='feedback-tooltip'>Your profile</Tooltip>}
        >
          <NavLink
            activeClassName={styles.ProfileActive}
            to={`/profile/${currentUser?.profile_id}`}
          >
            <Avatar src={currentUser?.profile_image} height={40} />
          </NavLink>
        </OverlayTrigger>
      </Nav>

      {/* User's rated playlists */}
      <Nav className='ml-auto'>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip id='feedback-tooltip'>Playlists you&apos;ve rated</Tooltip>
          }
        >
          <NavLink activeClassName={styles.Active} to='/rated-playlists'>
            <FontAwesomeIcon icon={faStar} size='2xl' />
          </NavLink>
        </OverlayTrigger>
      </Nav>

      {/* Spotify search page */}
      <Nav className='ml-auto'>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip id='feedback-tooltip'>Search Spotify</Tooltip>}
        >
          <NavLink to='/spotify-search'>
            <FontAwesomeIcon
              icon={faSpotify}
              style={{ color: '#1db954' }}
              size='2xl'
            />
          </NavLink>
        </OverlayTrigger>
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
