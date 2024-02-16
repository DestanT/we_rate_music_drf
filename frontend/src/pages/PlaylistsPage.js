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

const PlaylistsPage = ({ filter = '', profileView = false, pageName = '' }) => {
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
        } else if (err.response?.status === 404) {
          history.push('/404-error-page');
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
  }, [filter, history]);

  const displayWhyNoPlaylistsMessage = () => {
    switch (pageName) {
      case 'All Playlists':
        return <p>No playlists found!</p>;
      case 'Followed Users':
        return <p>You aren't following any users yet...</p>;
      case 'Your Rated Playlists':
        return <p>You haven't rated any playlists yet...</p>;
      default:
        return <p>No playlists found!</p>;
    }
  };

  return hasLoaded ? (
    <Container
      className={profileView ? styles.ProfileContainer : styles.Container}
    >
      {/* No SearchBar in pages with Profile.js component */}
      {!profileView ? (
        <>
          <Row className={styles.HighlightedContainer}>
            <Col>
              <h2>{pageName}</h2>
            </Col>
          </Row>
          <SearchBar liveSearch />
        </>
      ) : null}

      {playlists.results.length ? (
        <Container>
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
        displayWhyNoPlaylistsMessage()
      )}
    </Container>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistsPage;
