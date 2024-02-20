import React from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/Avatar.module.css';

const Avatar = ({ src, height = 45 }) => {
  const currentUser = useCurrentUser();
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt={`${currentUser?.username}' avatar`}
      />
    </span>
  );
};

export default Avatar;
