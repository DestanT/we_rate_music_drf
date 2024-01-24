import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faStar, faPeopleGroup, faSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
  <Navbar className={styles.CustomBackground} expand='md' fixed='bottom'>
    <Container>

      <Nav className='mr-auto'>
        <Nav.Link
          href='#ratings'
        >
          {/* Star icon */}
          <FontAwesomeIcon icon={faStar} size='2xl' />
        </Nav.Link>
      </Nav>

      <Nav className='mr-auto'>
        <Nav.Link
          href='#followed'
        >
          {/* Group/Follow icon */}
          <FontAwesomeIcon icon={faPeopleGroup} size='2xl' />
        </Nav.Link>
      </Nav>

      <Nav>
        {/* <Navbar.Brand href='#my-profile'>We Rate Music</Navbar.Brand> DELETE/CHANGE */}
        <Nav.Link
          href='#my-profile'
        >
          {/* Profile image */}
          <FontAwesomeIcon icon={faSquare} size='2xl' />
        </Nav.Link>
      </Nav>

      <Nav className='ml-auto'>
        <Nav.Link
          href='#placeholder'
        >
          {/* Placeholder - ^^ IMPLEMENT IF/ELSE FOR PROFILE IMAGE FOR NAV.LINK/NAVBAR.BRAND ^^ */}
          <FontAwesomeIcon icon={faSquare} size='2xl' />
        </Nav.Link>
      </Nav>

      <Nav className='ml-auto'>
        <Nav.Link
          href='#spotify'
        >
          {/* Spotify link */}
          <FontAwesomeIcon icon={faSpotify} style={{color: '#1db954',}} size='2xl' />
        </Nav.Link>
      </Nav>
      
    </Container>
  </Navbar>
  )
}

export default NavBar