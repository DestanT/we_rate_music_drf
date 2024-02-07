import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { normaliseSpotifyData } from '../utils/dataUtils';
import { axiosRes } from '../api/axiosDefaults';

import ModalWindow from '../components/ModalWindow';
import Playlist from '../components/Playlist';

import styles from '../styles/AddPlaylistButton.module.css';

function AddPlaylistButton({ playlistData: playlist }) {
  const currentUser = useCurrentUser();
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

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
    } catch (error) {
      setErrors({
        message:
          error.response?.data || 'Something went wrong! Please try again.',
      });
      setShowAlert(true);
    }
  };

  return (
    <>
      <Button onClick={() => setModalShow(true)} className={styles.Button}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </Button>

      {showAlert && errors?.message && (
        <Alert
          variant='warning'
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {errors.message}
        </Alert>
      )}

      <ModalWindow
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleSubmit}
        title='Add playlist to profile?'
        body={<Playlist data={normaliseSpotifyData(playlist)} />}
      />
    </>
  );
}

export default AddPlaylistButton;
