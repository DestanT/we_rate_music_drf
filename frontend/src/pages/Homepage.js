import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BackgroundImage from '../assets/homepage.png';
import styles from '../styles/Homepage.module.css';

const Homepage = () => {
  return (
    <Container className={styles.Container}>
      <Row>
        <Col xs={7}></Col>
        <Col xs={5} className={styles.TitleContainer}>
          <h1>We Rate Music</h1>
        </Col>
      </Row>
    </Container>
  );
};
export default Homepage;
