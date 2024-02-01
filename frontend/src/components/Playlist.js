import React from 'react';
import styles from '../styles/Playlist.module.css';
import { Col, Button } from 'react-bootstrap';
import { useSetSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';

const Playlist = (props) => {
  const { title, image, url, iframe_uri } = props;
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();

  const handleClick = () => {
    setSpotifyPlayerUri(iframe_uri);
  };

  // Set default image if no image is provided
  const defaultImage =
    'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';
  return (
    <Button variant='link' onClick={handleClick}>
      <Col xs={12} md={4} lg={3} className={styles.Playlist}>
        <img
          src={image || defaultImage}
          className={styles.Image}
          alt={`${title}'s cover art`}
        />
        <h5 className='mt-0'>{title}</h5>
      </Col>
    </Button>
  );
};

export default Playlist;
