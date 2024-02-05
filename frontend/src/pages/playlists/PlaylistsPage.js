import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';
import { fetchMoreData } from '../../utils/dataUtils';

import Playlist from '../../components/Playlist';
import LoadingSpinner from '../../components/LoadingSpinner';

import styles from '../../styles/PlaylistsPage.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import loadingStyles from '../../styles/LoadingSpinner.module.css';

const PlaylistsPage = ({ filter = 'owner__profile' }) => {
  const currentUser = useCurrentUser();
  const [playlists, setPlaylists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();

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

  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  return hasLoaded ? (
    <Container className={styles.MarginTop}>
      <InfiniteScroll
        dataLength={playlists.results.length}
        loader={<LoadingSpinner />}
        hasMore={!!playlists.next}
        next={() => fetchMoreData(playlists, setPlaylists)}
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
                onClick={() => updateSpotifyPlayerUri(playlist.iframe_uri)}
                className={btnStyles.Button}
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
