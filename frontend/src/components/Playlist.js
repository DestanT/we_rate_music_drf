import React from 'react';
import styles from '../styles/Playlist.module.css';

// Set default image if no image is provided
const defaultImage =
  'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';

/**
 * Playlist component to display the image of a playlist. Default image is used if no image is provided.
 *
 * @param {string} image - The image URL of the playlist
 * @param {string} title - The title of the playlist
 */
const Playlist = ({ image, title }) => {
  return (
    <img
      src={image || defaultImage}
      className={styles.Image}
      alt={`${title}'s cover art`}
    />
  );
};

export default Playlist;
