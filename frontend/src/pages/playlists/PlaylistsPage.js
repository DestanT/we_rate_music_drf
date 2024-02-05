import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Playlist from '../../components/Playlist';
import { axiosReq } from '../../api/axiosDefaults';
import LoadingSpinner from '../../components/LoadingSpinner';
import appStyles from '../../App.module.css';
import loadingStyles from '../../styles/LoadingSpinner.module.css';

const PlaylistsPage = () => {
  const currentUser = useCurrentUser();
  const [playlists, setPlaylists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

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
            <Playlist data={playlist} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : (
    <LoadingSpinner className={loadingStyles.Centered} />
  );
};

export default PlaylistsPage;
