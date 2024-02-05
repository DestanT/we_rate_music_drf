import React from 'react';
import styles from '../styles/Playlist.module.css';

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

  // Set default image if no image is provided
  const defaultImage =
    'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';

  return (
    <>
      <img
        src={image || defaultImage}
        className={styles.Image}
        alt={`${title}'s cover art`}
      />
    </>
  );
};

export default Playlist;
