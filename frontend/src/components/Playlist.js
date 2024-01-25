import React from 'react'
import { Card } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/PlaylistsPage.module.css';

const Playlist = (props) => {
  const currentUser = useCurrentUser();
  const {
    id,
    owner,
    added_on,
    title,
    image,
    is_owner,
    url,
    iframe_uri,
    rating_id,
    ratings_count,
    average_rating
  } = props;
  return (
    <Card>
      <Card.Img variant="top" src={currentUser?.profile_image} className={styles.Playlist} />
      <Card.Body>
        <Card.Title>{currentUser.username}'s Playlist</Card.Title>
        <Card.Text>
          Some playlist information
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Playlist