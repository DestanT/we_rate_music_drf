import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';

import Avatar from './Avatar';
import LoadingSpinner from './LoadingSpinner';
import SignOutButton from './SignOutButton';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faStar,
  faPen,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import styles from '../styles/Profile.module.css';
import btnStyles from '../styles/Button.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

const Profile = ({ userId }) => {
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 768);
  const history = useHistory();

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${userId}`);
        setProfileData(data);
        setIsFollowing(data.following_id ? true : false);
        setHasLoaded(true);
      } catch (err) {
        if (err.response?.status === 404) {
          history.push('/404-error-page');
        } else {
          // console.log(err.response.data);
        }
      }
    };

    setHasLoaded(false);
    fetchProfileData();
  }, [userId, history]);

  const handleFollow = async (profile) => {
    try {
      const { data } = await axiosRes.post('followers/', {
        followed: profile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count + 1,
        following_id: data.id,
      }));

      setIsFollowing(true);
    } catch (err) {
      // console.log(err.response.data);
    }
  };

  const handleUnfollow = async (profile) => {
    try {
      await axiosRes.delete(`followers/${profile.following_id}`);

      setProfileData((prevState) => ({
        ...prevState,
        followers_count: prevState.followers_count - 1,
      }));

      setIsFollowing(false);
    } catch (err) {
      // console.log(err.response.data);
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
          className={styles.ProfileBottomRightIcon}
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
          className={styles.ProfileBottomRightIcon}
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
          className={styles.ProfileBottomRightIcon}
        />
      </Button>
    </OverlayTrigger>
  );

  const feedbackButton = (
    <OverlayTrigger
      placement='bottom'
      overlay={<Tooltip id='feedback-tooltip'>Help us improve!</Tooltip>}
    >
      <Button
        onClick={() => history.push('/feedback/create')}
        className={btnStyles.TransparentButton}
      >
        <FontAwesomeIcon
          icon={faCommentDots}
          size='xl'
          className={styles.ProfileTopRightIcon}
        />
      </Button>
    </OverlayTrigger>
  );

  const smallScreenStatsContainer = (
    <>
      <Row className={styles.StatsRow}>
        <p className={styles.StatsItem}>
          Playlists: {profileData.playlists_count}
        </p>
      </Row>
      <Row className={styles.StatsRow}>
        <p className={styles.StatsItem}>
          Followers: {profileData.followers_count}
        </p>
      </Row>
      <Row className={styles.StatsRow}>
        <p className={styles.StatsItem}>
          Following: {profileData.following_count}
        </p>
      </Row>
    </>
  );

  const largeScreenStatsContainer = (
    <Row className={styles.StatsRow}>
      <Col md={4} className='align-self-center'>
        <h4 className='mb-0'>{profileData.playlists_count}</h4>
        <p className={styles.StatsItem}>Playlists</p>
      </Col>
      <Col md={4} className='align-self-center'>
        <h4 className='mb-0'>{profileData.followers_count}</h4>
        <p className={styles.StatsItem}>Followers</p>
      </Col>
      <Col md={4} className='align-self-center'>
        <h4 className='mb-0'>{profileData.following_count}</h4>
        <p className={styles.StatsItem}>Following</p>
      </Col>
    </Row>
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
            <h2 className='mb-0'>{profileData.owner}</h2>
            {profileData.is_owner && (
              <em className={styles.SmallText}>You're logged in as:</em>
            )}
          </Col>
          <Col xs={3}>
            <SignOutButton />
          </Col>
        </Row>
      </Container>

      {/* Profile picture and stats */}
      <Container className={styles.AvatarStatsContainer}>
        <Row className={styles.AlignItemsCenter}>
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

            {/* Feedback button - if the current user is the owner of the profile */}
            {currentUser && profileData?.is_owner && feedbackButton}
          </Col>
          <Col xs={9}>
            {smallScreen
              ? smallScreenStatsContainer
              : largeScreenStatsContainer}
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
        <Container className={styles.AvatarStatsContainer}>
          <LoadingSpinner className={loadingStyles.Centered} />
        </Container>
      </Container>
    </>
  );
};

export default Profile;
