import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useRedirect } from '../hooks/useRedirect';

import { axiosReq } from '../api/axiosDefaults';
import { useSetSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';

import Playlist from '../components/Playlist';
import Profile from '../components/Profile';
import { Rating, StickerStar } from '@smastrom/react-rating';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/PlaylistDetail.module.css';
import btnStyles from '../styles/Button.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();
  const history = useHistory();

  useRedirect();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data: playlist } = await axiosReq.get(`playlists/${id}`);

        setPlaylist(playlist);
        setHasLoaded(true);
        console.log(playlist);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPlaylist();
  }, [id]);

  const redirectToEdit = () => {
    history.push(`/playlist/${id}/edit`);
  };

  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  // Custom styles for the <Rating /> component
  const myStyles = {
    itemShapes: StickerStar,
    activeFillColor: '#df604e',
    inactiveFillColor: '#df5f4e6e',
  };

  return hasLoaded ? (
    <>
      <Profile userId={playlist.owner_id} />
      <Container className={styles.Container}>
        <Row>
          <Col>
            <h2>{playlist.title}</h2>
            <OverlayTrigger
              placement='bottom'
              overlay={<Tooltip id='back-tooltip'>Play</Tooltip>}
            >
              <Button
                variant='link'
                onClick={() => updateSpotifyPlayerUri(playlist.iframe_uri)}
                className={styles.Button}
              >
                <FontAwesomeIcon icon={faPlay} size='xl' />
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
          <Col>
            <Rating
              readOnly={true}
              value={playlist.average_rating || 0}
              style={{ maxWidth: 250, margin: 'auto' }}
              itemStyles={myStyles}
            />
            <p>
              <em>Average Rating: {playlist.average_rating || 0}</em>
            </p>
            <p>
              <em># of Ratings: {playlist.ratings_count}</em>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant='link'
              onClick={() => history.push(`/profile/${playlist.owner_id}`)}
              className={styles.Button}
            >
              <Playlist image={playlist.image} title={playlist.title} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>{playlist.description}</Col>
        </Row>
        <Row>
          <Col>
            <StarRating playlist={playlist} setPlaylist={setPlaylist} />
          </Col>
        </Row>

        {playlist.is_owner && (
          <>
            <br />
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
    </>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistDetail;
