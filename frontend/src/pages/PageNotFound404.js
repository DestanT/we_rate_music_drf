import React from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-regular-svg-icons';

import waveform from '../assets/waveform.png';

const PageNotFound404 = () => {
  return (
    <Container style={{ padding: '150px 0', overflow: 'hidden' }}>
      <Row>
        <Col>
          <h1>
            4<FontAwesomeIcon icon={faFaceDizzy} />4
          </h1>
          <h4>Page not found</h4>
          <img src={waveform} alt='Sound waveform' style={{ width: '100%' }} />
          <p>
            Oops... The link you clicked may be broken or the page may have been
            removed. Click to go back to the <Link to='/'>homepage</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound404;
