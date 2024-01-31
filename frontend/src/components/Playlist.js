import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Playlist.module.css';

const Playlist = (props) => {
  const { title, image, url, iframe_uri } = props;
  const defaultImage =
    'https://res.cloudinary.com/dxgzepuov/image/upload/v1702896303/default_post_uq5gxz.jpg';
  return (
    <div className='media'>
      <img
        src={image || defaultImage}
        className={`mr-3 ${styles.Playlist}`}
        alt='...'
      />
      <div className='media-body'>
        <h5 className='mt-0'>{title}</h5>
        <p>{url}</p>
        <p>{iframe_uri}</p>
      </div>
    </div>
  );
};

export default Playlist;
