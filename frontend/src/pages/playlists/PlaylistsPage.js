import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Playlist from '../../components/Playlist';
import { axiosReq } from '../../api/axiosDefaults';
import LoadingSpinner from '../../components/LoadingSpinner';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import loadingStyles from '../../styles/LoadingSpinner.module.css';
import { useSetSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';

const PlaylistsPage = () => {
  const currentUser = useCurrentUser();
  const [playlists, setPlaylists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await axiosReq.get('playlists/');
        setPlaylists(data.results);
        console.log(data.results);
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
    <Container>
      <Row>
        {playlists.map((playlist) => (
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
    </Container>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistsPage;
