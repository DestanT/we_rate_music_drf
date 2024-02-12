import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useRedirect } from '../hooks/useRedirect';

import { axiosReq } from '../api/axiosDefaults';
import { useSetSpotifyPlayerUri } from '../contexts/SpotifyPlayerUriContext';

import Playlist from '../components/Playlist';
import Profile from '../components/Profile';
import StarRating from '../components/StarRating';

import styles from '../styles/PlaylistDetail.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [ratings, setRatings] = useState([]);
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();
  const history = useHistory();

  useRedirect();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const [{ data: playlist }, { data: ratings }] = await Promise.all([
          axiosReq.get(`playlists/${id}`),
          axiosReq.get(`ratings/?playlist=${id}`),
        ]);

        setPlaylist(playlist);
        setRatings(ratings);
        console.log(playlist);
        console.log(ratings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaylist();
  }, [id]);

  // NOTE: ATTACH THIS LOGIC TO ANOTHER BUTTON
  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  return (
    <>
      <Profile userId={playlist.owner_id} />
      <Container className={styles.Container}>
        <Row>
          <Col xs={4}>
            <Button
              variant='link'
              onClick={() => history.goBack()}
              className={styles.Button}
            >
              <Playlist image={playlist.image} title={playlist.title} />
            </Button>
          </Col>
          <Col xs={8}>
            <Row>
              <Col>
                <h5>{playlist.title}</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <h6>Average Rating</h6>
                <p>{playlist.average_rating || '0'}</p>
              </Col>
              <Col xs={6}>
                <h6># of Ratings</h6>
                <p>{playlist.ratings_count}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <StarRating playlist={playlist} />
      </Container>
    </>
  );
};

export default PlaylistDetail;
