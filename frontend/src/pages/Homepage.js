import React from 'react';
import { useRedirect } from '../hooks/useRedirect';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import styles from '../styles/Homepage.module.css';

const Homepage = () => {
  useRedirect();
  return (
    <Container className={styles.Container}>
      <Row>
        <Col xs={7}></Col>
        <Col xs={5} className={styles.TitleContainer}>
          <h1 className={styles.Title}>We Rate Music</h1>
          <hr className={styles.Line} />
          <hr className={styles.SecondLine} />
          <Row>
            <Col className={styles.IntroContainer}>
              <p>
                Welcome to We Rate Music! The place to rate and review your
                favorite music.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Homepage;
