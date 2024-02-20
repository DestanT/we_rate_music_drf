import React, { useEffect, useState } from 'react';

import { useSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';
import SpotifyPlayer from '../spotify/SpotifyPlayer';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/AccordionWindow.module.css';

function AccordionWindow() {
  const spotifyPlayerUri = useSpotifyPlayerUri();
  const [activeKey, setActiveKey] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (spotifyPlayerUri) {
      setActiveKey('0');
      setShowPlayer(true);
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
      className={`${styles.AccordionPosition} ${
        showPlayer ? '' : styles.Hidden
      }`}
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
