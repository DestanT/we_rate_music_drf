import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

import Avatar from './Avatar';
import LoadingSpinner from './LoadingSpinner';

import styles from '../styles/Profile.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${userId}`);
        setProfileData(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchProfileData();
  }, [userId]);

  return hasLoaded ? (
    // Profile data loaded
    <Container
      className={styles.ProfileContainer}
      style={{ backgroundImage: `url(${profileData.background})` }}
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
            <h2>{profileData.owner}</h2>
          </Col>
          <Col xs={3}>Settings</Col>
        </Row>
      </Container>

      {/* Profile picture and stats */}
      <Container className={styles.StatsContainer}>
        <Row>
          <Col xs={3}>
            <Avatar src={profileData.image} height={100} />
          </Col>
          <Col xs={9}>
            <Row>
              <Col xs={4}>
                <h3>{profileData.followers_count}</h3>
                <p>Followers</p>
              </Col>
              <Col xs={4}>
                <h3>{profileData.following_count}</h3>
                <p>Following</p>
              </Col>
              <Col xs={4}>
                <h3>{profileData.playlists_count}</h3>
                <p>Playlists</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    // Profile data not yet loaded
    <>
      {/* Replicated container structure and styles */}
      <Container className={styles.ProfileContainer}>
        <Container>
          <LoadingSpinner className={loadingStyles.Centered} />
        </Container>
        <Container className={styles.StatsContainer}>
          <LoadingSpinner className={loadingStyles.Centered} />
        </Container>
      </Container>
    </>
  );
};

export default Profile;
