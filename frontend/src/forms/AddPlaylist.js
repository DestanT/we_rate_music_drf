import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

function AddPlaylist({ playlist }) {
  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState({});

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
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <>
      <Button onClick={handleSubmit}>
        <FontAwesomeIcon icon={faSquarePlus} size='2xl' />
      </Button>

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

export default AddPlaylist;
