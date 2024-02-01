import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';

const Profile = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <Container
      className={styles.ProfileContainer}
      style={{ backgroundImage: `url(${currentUser?.profile_background})` }}
    >
      {/* Header */}
      <Container>
        <Row>
          <Col xs={3}>
            <FontAwesomeIcon
              icon={faBackward}
              size='xl'
              className={styles.FontAwesomeIcon}
            />
          </Col>
          <Col xs={6}>
            <h2>{currentUser?.username}</h2>
          </Col>
          <Col xs={3}>Settings</Col>
        </Row>
      </Container>

      {/* Profile picture and stats */}
      <Container className={styles.StatsContainer}>
        <Row>
          <Col xs={3}>
            <Avatar src={currentUser?.profile_image} height={100} />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={4}>
                <h3>{currentUser?.followers}</h3>
                <p>Followers</p>
              </Col>
              <Col xs={4}>
                <h3>{currentUser?.following}</h3>
                <p>Following</p>
              </Col>
              <Col xs={4}>
                <h3>{currentUser?.playlists}</h3>
                <p>Playlists</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Profile;
