import React from 'react';
import styles from '../styles/Playlist.module.css';
import { Button } from 'react-bootstrap';
import { useSetSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';

const Playlist = ({ data }) => {
  const {
    // Spotify data
    spotify_id,
    title,
    image,
    url,
    iframe_uri,
    // DRF data
    id,
    owner,
    is_owner,
    added_on,
    average_rating,
    rating_id,
    ratings_count,
  } = data;

  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();

  // Set default image if no image is provided
  const defaultImage =
    'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';

  // Set the Spotify player's URI for SpotifyPlayer.js component
  const handleClick = () => {
    setSpotifyPlayerUri(iframe_uri);
  };

  return (
    <Button variant='link' onClick={handleClick}>
      <img
        src={image || defaultImage}
        className={styles.Image}
        alt={`${title}'s cover art`}
      />
      <h5 className='mt-0'>{title}</h5>
    </Button>
  );
};

export default Playlist;
