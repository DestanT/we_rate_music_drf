import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '../styles/Homepage.module.css';

const Homepage = () => {
  return (
    <Container className={styles.Container}>
      <Row>
        <Col xs={7}></Col>
        <Col xs={5} className={styles.TitleContainer}>
          <h1>We Rate Music</h1>
          <hr className={styles.Line} />
          <hr className={styles.SecondLine} />
          <Row className={styles.PaddingTop}>
            <Col>
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
