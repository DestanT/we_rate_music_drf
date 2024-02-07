import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { fetchMoreData } from '../utils/dataUtils';

import Playlist from '../components/Playlist';
import LoadingSpinner from '../components/LoadingSpinner';

import styles from '../../styles/PlaylistsPage.module.css';
import appStyles from '../../App.module.css';
import loadingStyles from '../../styles/LoadingSpinner.module.css';

const PlaylistsPage = ({ filter = '' }) => {
  const currentUser = useCurrentUser();
  const [playlists, setPlaylists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await axiosReq.get(`playlists/?${filter}`);
        setPlaylists(data);
        console.log(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPlaylists();
  }, []);

  return hasLoaded ? (
    <Container className={styles.Container}>
      <InfiniteScroll
        dataLength={playlists.results.length}
        loader={<LoadingSpinner />}
        hasMore={!!playlists.next}
        next={() => fetchMoreData(playlists, setPlaylists)}
        className={styles.InfiniteScroll}
      >
        <Row>
          {playlists.results.map((playlist) => (
            <Col
              className={appStyles.PaddingReset}
              key={playlist.id}
              xs={4}
              md={3}
            >
              <Button
                variant='link'
                onClick={() => history.push(`/playlist/${playlist.id}`)}
                className={styles.Button}
              >
                <Playlist data={playlist} />
              </Button>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Container>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistsPage;
