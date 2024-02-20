import React, { useState } from 'react';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';

import ModalWindow from '../components/ModalWindow';
import Playlist from '../components/Playlist';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import btnStyles from '../styles/Button.module.css';

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
      owner: currentUser.profile_id,
    };

    try {
      await axiosRes.post('playlists/', data);
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
      <Button onClick={() => setModalShow(true)} className={btnStyles.Button}>
        Add
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
        title={`Add "${playlist.name}" to your profile?`}
        body={
          <Playlist image={playlist.images[0]?.url} title={playlist.name} />
        }
      />
    </>
  );
}

export default AddPlaylistButton;
