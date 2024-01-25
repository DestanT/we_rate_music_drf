import React from 'react'
import styles from '../../styles/PlaylistsPage.module.css'
import { Col, Row } from 'react-bootstrap'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const PlaylistsPage = () => {
  const currentUser = useCurrentUser();
  return (
    <Row>
      <Col xs={4} xl={3}>
        <img
        className={styles.Playlist}
        src={currentUser?.profile_image}
        alt={`${currentUser?.username}' playlist`}
        />
      </Col>
      <Col xs={4} xl={3}>
        <img
        className={styles.Playlist}
        src={currentUser?.profile_image}
        alt={`${currentUser?.username}' playlist`}
        />
      </Col>
      <Col xs={4} xl={3}>
        <img
        className={styles.Playlist}
        src={currentUser?.profile_image}
        alt={`${currentUser?.username}' playlist`}
        />
      </Col>
      <Col xs={4} xl={3}>
        <img
        className={styles.Playlist}
        src={currentUser?.profile_image}
        alt={`${currentUser?.username}' playlist`}
        />
      </Col>
    </Row>
  )
}

export default PlaylistsPage