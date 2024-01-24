import styles from '../styles/NavBar.module.css';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faStar, faPeopleGroup, faSquare } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
  <Navbar className={styles.CustomBackground} expand='md' fixed='bottom'>
    <Container>

      <Nav className='mr-auto'>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to='/popular'
        >
          {/* Star icon */}
          <FontAwesomeIcon icon={faStar} size='2xl' />
        </NavLink>
      </Nav>

      <Nav className='mr-auto'>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to='/feed'
        >
          {/* Group/Follow icon */}
          <FontAwesomeIcon icon={faPeopleGroup} size='2xl' />
        </NavLink>
      </Nav>

      <Nav>
        {/* <Navbar.Brand href='#my-profile'>We Rate Music</Navbar.Brand> DELETE/CHANGE */}
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to='/profile'
        >
          {/* Profile image */}
          <FontAwesomeIcon icon={faSquare} size='2xl' />
        </NavLink>
      </Nav>

      <Nav className='ml-auto'>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to='/placeholder'
        >
          {/* Placeholder - ^^ IMPLEMENT IF/ELSE FOR PROFILE IMAGE FOR NAV.LINK/NAVBAR.BRAND ^^ */}
          <FontAwesomeIcon icon={faSquare} size='2xl' />
        </NavLink>
      </Nav>

      <Nav className='ml-auto'>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to='/spotify-search'
        >
          {/* Spotify link */}
          <FontAwesomeIcon icon={faSpotify} style={{color: '#1db954',}} size='2xl' />
        </NavLink>
      </Nav>
      
    </Container>
  </Navbar>
  )
}

export default NavBar