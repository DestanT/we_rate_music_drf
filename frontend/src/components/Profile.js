import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';

const Profile = (props) => {
  if (!props.data) {
    return <h1>Loading...</h1>;
  }
  const {
    owner,
    image,
    background,
    playlists_count,
    followers_count,
    following_count,
  } = props.data;

  return (
    <Container
      className={styles.ProfileContainer}
      style={{ backgroundImage: `url(${background})` }}
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
            <h2>{owner}</h2>
          </Col>
          <Col xs={3}>Settings</Col>
        </Row>
      </Container>

      {/* Profile picture and stats */}
      <Container className={styles.StatsContainer}>
        <Row>
          <Col xs={3}>
            <Avatar src={image} height={100} />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={4}>
                <h3>{followers_count}</h3>
                <p>Followers</p>
              </Col>
              <Col xs={4}>
                <h3>{following_count}</h3>
                <p>Following</p>
              </Col>
              <Col xs={4}>
                <h3>{playlists_count}</h3>
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
