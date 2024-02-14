import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import axios from 'axios';

import { useCurrentUser } from '../contexts/CurrentUserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faStar, faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import Avatar from './Avatar';
import LoadingSpinner from './LoadingSpinner';
import SignOutButton from './SignOutButton';

import styles from '../styles/Profile.module.css';
import btnStyles from '../styles/Button.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

const Profile = ({ userId }) => {
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Sends a CancelToken with the request
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${userId}`, {
          cancelToken: source.token,
        });
        setProfileData(data);
        console.log('profiledata: ', data);
        setIsFollowing(data.following_id ? true : false);
        setHasLoaded(true);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          console.log(err);
        }
      }
    };

    setHasLoaded(false);
    fetchProfileData();

    // Cleanup
    return () => {
      source.cancel('Request canceled');
    };
  }, [userId]);

  const handleFollow = async (profile) => {
    try {
      const { data } = await axiosRes.post('followers/', {
        followed: profile.id,
      });
      console.log('handleFollow: ', data);

      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count + 1,
        following_id: data.id,
      }));

      setIsFollowing(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (profile) => {
    try {
      const { data } = await axiosRes.delete(
        `followers/${profile.following_id}`
      );
      console.log('handleUnfollow: ', data);

      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count - 1,
      }));

      setIsFollowing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const followButton = (
    <OverlayTrigger
      placement='bottom'
      overlay={<Tooltip id='follow-tooltip'>Follow</Tooltip>}
    >
      <Button
        className={btnStyles.TransparentButton}
        onClick={() => handleFollow(profileData)}
      >
        <FontAwesomeIcon
          icon={emptyStar}
          size='xl'
          className={styles.ProfileFontAwesomeIcon}
        />
      </Button>
    </OverlayTrigger>
  );

  const unfollowButton = (
    <OverlayTrigger
      placement='bottom'
      overlay={<Tooltip id='unfollow-tooltip'>Unfollow</Tooltip>}
    >
      <Button
        className={btnStyles.TransparentButton}
        onClick={() => handleUnfollow(profileData)}
      >
        <FontAwesomeIcon
          icon={faStar}
          size='xl'
          className={styles.ProfileFontAwesomeIcon}
        />
      </Button>
    </OverlayTrigger>
  );

  const editButton = (
    <OverlayTrigger
      placement='bottom'
      overlay={<Tooltip id='edit-tooltip'>Edit</Tooltip>}
    >
      <Button
        className={btnStyles.TransparentButton}
        onClick={() => history.push(`/profile/${userId}/edit`)}
      >
        <FontAwesomeIcon
          icon={faPen}
          size='xl'
          className={styles.ProfileFontAwesomeIcon}
        />
      </Button>
    </OverlayTrigger>
  );

  return hasLoaded ? (
    // Profile data loaded
    <Container
      className={styles.ProfileContainer}
      style={{ backgroundImage: `url(${profileData.background})` }}
    >
      {/* Header */}
      <Container>
        <Row>
          {/* Back button */}
          <Col xs={3}>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='back-tooltip'>Back</Tooltip>}
            >
              <FontAwesomeIcon
                icon={faBackward}
                size='xl'
                className={styles.FontAwesomeIcon}
                onClick={() => history.goBack()}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={6}>
            <h2>{profileData.owner}</h2>
          </Col>
          <Col xs={3}>
            <SignOutButton />
          </Col>
        </Row>
      </Container>

      {/* Profile picture and stats */}
      <Container className={styles.StatsContainer}>
        <Row>
          <Col xs={3} className={styles.AvatarContainer}>
            <Button
              type='link'
              className={btnStyles.TransparentButton}
              onClick={() => history.push(`/profile/${profileData.id}`)}
            >
              <Avatar src={profileData.image} height={100} />
            </Button>

            {/* Follow/Unfollow button - if the current user is not the owner of the profile */}
            {currentUser &&
              !profileData?.is_owner &&
              (isFollowing ? unfollowButton : !isFollowing && followButton)}

            {/* Edit button - if the current user is the owner of the profile */}
            {currentUser && profileData?.is_owner && editButton}
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
