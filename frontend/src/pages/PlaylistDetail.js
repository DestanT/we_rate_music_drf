import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSetSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';
import { useRedirect } from '../hooks/useRedirect';
import { axiosReq } from '../api/axiosDefaults';

import Playlist from '../components/Playlist';
import Profile from '../components/Profile';
import { Rating, StickerStar } from '@smastrom/react-rating';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

import styles from '../styles/PlaylistDetail.module.css';
import btnStyles from '../styles/Button.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useRedirect();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data: playlist } = await axiosReq.get(`playlists/${id}`);

        setPlaylist(playlist);
        setHasLoaded(true);
      } catch (err) {
        if (err.response?.status === 404) {
          history.push('/404-error-page');
        } else {
          setErrors({
            message: 'Error fetching playlist data, please refresh the page',
          });
          setShowAlert(true);
        }
      }
    };

    setHasLoaded(false);
    fetchPlaylist();
  }, [id, history]);

  const redirectToEdit = () => {
    history.push(`/playlist/${id}/edit`);
  };

  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  // Custom styles for the <Rating /> component
  const averageRatingStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#df604e',
    inactiveFillColor: '#df5f4e6e',
  };
  const ownerRatingStyles = {
    itemShapes: StickerStar,
    itemStrokeWidth: 2,
    activeFillColor: '#d14e3d',
    activeStrokeColor: '#5a5550',
    inactiveFillColor: '#df5f4e2a',
    inactiveStrokeColor: '#5a5550',
  };

  const displayOwnerAndRating = (
    <Row>
      {/* Empty - to help with alignment */}
      <Col xs={6}></Col>

      {/* Owners name and own rating */}
      <Col xs={6} style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '0' }}>-{playlist.owner}</p>
        <Rating
          readOnly={true}
          value={playlist.owner_rating}
          style={{ minWidth: 75, maxWidth: 100, margin: 'auto' }}
          itemStyles={ownerRatingStyles}
        />
      </Col>
    </Row>
  );

  const displayJustOwner = (
    <Row>
      {/* Empty - to help with alignment */}
      <Col xs={6}></Col>

      {/* Owners name and own rating */}
      <Col xs={6} style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '0' }}>-{playlist.owner}</p>
      </Col>
    </Row>
  );

  return hasLoaded ? (
    <>
      <Profile userId={playlist.owner_id} />
      <Container className={styles.Container}>
        <Row>
          <Col>
            <h2>{playlist.title}</h2>
          </Col>
        </Row>
        <Row className={styles.RowPadding}>
          {/* Average rating information */}
          <Col xs={6}>
            <em>Average Rating: {playlist.average_rating || 0}</em>
            <Rating
              readOnly={true}
              value={playlist.average_rating || 0}
              style={{ maxWidth: 180, margin: 'auto' }}
              itemStyles={averageRatingStyles}
            />
            <em>Rated: {playlist.ratings_count} time(s)</em>
          </Col>

          {/* Play button */}
          <Col xs={6}>
            <p style={{ marginBottom: '0' }}>click here..</p>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='back-tooltip'>Play</Tooltip>}
            >
              <Button
                variant='link'
                onClick={() => updateSpotifyPlayerUri(playlist.iframe_uri)}
              >
                <FontAwesomeIcon
                  icon={faSpotify}
                  style={{ color: '#1db954' }}
                  size='2xl'
                />
              </Button>
            </OverlayTrigger>
            <p style={{ marginBottom: '0' }}>..have a listen!</p>
          </Col>
        </Row>

        {/* Playlist's image and description */}
        <Row className={styles.HighlightedContainer}>
          <Col xs={4}>
            <Button
              variant='link'
              onClick={() => history.push(`/profile/${playlist.owner_id}`)}
              className={styles.Button}
            >
              <Playlist image={playlist.image} title={playlist.title} />
            </Button>
          </Col>
          <Col xs={8}>
            <Row>
              <Col className={styles.ScreenSizeContidionalPadding}>
                {playlist.description ? (
                  <p className={styles.WordBreak}>
                    &quot;{playlist.description}&quot;
                  </p>
                ) : (
                  <p>
                    <em>
                      -{playlist.owner} hasn&apos;t said anything about this
                      playlist yet-
                    </em>
                  </p>
                )}
              </Col>
            </Row>

            {/* Displays owners name and rating, if rating. If no rating, displays owners name, if description. Else, null */}
            {playlist.owner_rating
              ? displayOwnerAndRating
              : !playlist.owner_rating &&
                playlist.description &&
                displayJustOwner}
          </Col>
        </Row>

        {/* StarRating component - lets user/owner add/edit rating objects */}
        <Row>
          <Col>
            <StarRating playlist={playlist} setPlaylist={setPlaylist} />
          </Col>
        </Row>
        {/* Edit playlist for playlist owner */}
        {playlist.is_owner && (
          <>
            <Row>
              <Col>
                <Button onClick={redirectToEdit} className={btnStyles.Button}>
                  Edit Playlist
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {showAlert && errors?.message && (
        <Alert
          variant='warning'
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {errors.message}
        </Alert>
      )}
    </>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistDetail;
