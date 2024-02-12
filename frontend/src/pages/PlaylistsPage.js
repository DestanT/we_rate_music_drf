import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useRedirect } from '../hooks/useRedirect';

import axios from 'axios';
import { axiosReq } from '../api/axiosDefaults';
import { fetchMoreData } from '../utils/dataUtils';

import Playlist from '../components/Playlist';
import LoadingSpinner from '../components/LoadingSpinner';

import styles from '../styles/PlaylistsPage.module.css';
import appStyles from '../App.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';
import SearchBar from '../components/SearchBar';

const PlaylistsPage = ({ filter = '', profileView = false }) => {
  const [playlists, setPlaylists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const history = useHistory();

  useRedirect();

  useEffect(() => {
    // Sends a CancelToken with the request
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    console.log('PlaylistsPage rendered');

    const fetchPlaylists = async () => {
      try {
        const { data } = await axiosReq.get(`playlists/?${filter}`, {
          cancelToken: source.token,
        });
        setPlaylists(data);
        console.log('playlist data: ', data);
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
    fetchPlaylists();

    // Cleanup
    return () => {
      source.cancel('Request canceled');
    };
  }, [filter]);

  return hasLoaded ? (
    <Container
      className={profileView ? styles.ProfileContainer : styles.Container}
    >
      {/* No SearchBar in pages with Profile.js component */}
      {!profileView ? <SearchBar liveSearch data={playlists} /> : null}

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
                <Playlist image={playlist.image} title={playlist.title} />
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
