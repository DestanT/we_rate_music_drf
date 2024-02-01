import React from 'react';
import styles from '../styles/AccordionWindow.module.css';
import { Accordion, Card, Button } from 'react-bootstrap';
import SpotifyPlayer from '../api/spotifyApi/spotifyPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function AccordionWindow() {
  return (
    <Accordion defaultActiveKey='0' className={styles.AccordionPosition}>
      <Card className={styles.Card}>
        <Card.Header className={styles.Header}>
          <Accordion.Toggle
            as={Button}
            variant='link'
            eventKey='0'
            className={styles.Button}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <SpotifyPlayer />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default AccordionWindow;
