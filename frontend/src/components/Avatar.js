import React from 'react';
import styles from '../styles/Avatar.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';

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
  )
}

export default Avatar