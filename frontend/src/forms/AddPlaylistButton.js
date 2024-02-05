import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { normaliseSpotifyData } from '../utils/dataUtils';
import { axiosRes } from '../api/axiosDefaults';

import ModalWindow from '../components/ModalWindow';
import Playlist from '../components/Playlist';

function AddPlaylistButton({ playlistData: playlist }) {
  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      spotify_id: playlist.id,
      title: playlist.name,
      image: playlist.images[0]?.url,
      url: playlist.external_urls.spotify,
      iframe_uri: playlist.uri,
      owner: currentUser.id,
    };

    try {
      const response = await axiosRes.post('playlists/', data);
      console.log(response);
      setModalShow(false);
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrors(err.response.data);
      }
    } finally {
      setModalShow(false);
    }
  };

  return (
    <>
      <Button onClick={() => setModalShow(true)}>Add Playlist</Button>

      <ModalWindow
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleSubmit}
        title='Add playlist to profile?'
        body={<Playlist data={normaliseSpotifyData(playlist)} />}
      />

      {/* NOTE: REFINE */}
      {errors && (
        <Alert variant='warning'>
          {errors.spotify_id && <p>{errors.spotify_id}</p>}
          {errors.title && <p>{errors.title}</p>}
          {errors.image && <p>{errors.image}</p>}
          {errors.url && <p>{errors.url}</p>}
          {errors.iframe_uri && <p>{errors.iframe_uri}</p>}
          {errors.owner && <p>{errors.owner}</p>}
        </Alert>
      )}
    </>
  );
}

export default AddPlaylistButton;
