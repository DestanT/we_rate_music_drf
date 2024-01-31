import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../styles/PlaylistsPage.module.css';

const Playlist = (props) => {
  const { title, image, url, iframe_uri } = props;
  return (
    <Card>
      <Card.Img variant='top' src={image} className={styles.Playlist} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{url}</Card.Text>
        <Card.Text>{iframe_uri}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Playlist;
