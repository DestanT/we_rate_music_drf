import React, { useEffect, useState } from 'react';
import styles from '../styles/AccordionWindow.module.css';
import { Accordion, Card, Button } from 'react-bootstrap';
import SpotifyPlayer from '../spotify/SpotifyPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';

function AccordionWindow() {
  const spotifyPlayerUri = useSpotifyPlayerUri();
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    if (spotifyPlayerUri) {
      setActiveKey('0');
    }
  }, [spotifyPlayerUri]);

  const handleToggle = () => {
    if (activeKey === '0') {
      setActiveKey('');
    } else {
      setActiveKey('0');
    }
  };

  return (
    <Accordion
      activeKey={activeKey}
      onSelect={handleToggle}
      className={styles.AccordionPosition}
    >
      <Card className={styles.Card}>
        <Card.Header className={styles.Header}>
          <Accordion.Toggle
            as={Button}
            variant='link'
            eventKey='0'
            className={styles.PaddingReset}
          >
            <FontAwesomeIcon icon={activeKey ? faCaretDown : faCaretUp} />
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body className={styles.PaddingReset}>
            <SpotifyPlayer />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default AccordionWindow;
