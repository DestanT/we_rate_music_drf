import React from 'react';
import styles from '../styles/Playlist.module.css';
import { Col } from 'react-bootstrap';

const Playlist = (props) => {
  const { title, image, url, iframe_uri } = props;
  const defaultImage =
    'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';
  return (
    <Col xs={12} md={4} lg={3} className={styles.Playlist}>
      <img
        src={image || defaultImage}
        className={styles.Image}
        alt={`${title}'s cover art`}
      />
      <h5 className='mt-0'>{title}</h5>
    </Col>
  );
};

export default Playlist;
