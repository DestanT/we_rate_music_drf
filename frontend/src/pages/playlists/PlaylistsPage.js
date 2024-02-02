import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Playlist from '../../components/Playlist';
import { axiosReq } from '../../api/axiosDefaults';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    <Row>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </Row>
  ) : (
    <LoadingSpinner />
  );
};

export default PlaylistsPage;
