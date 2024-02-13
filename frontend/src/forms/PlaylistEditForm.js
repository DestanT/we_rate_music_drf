import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import Profile from '../components/Profile';
import Playlist from '../components/Playlist';
import styles from '../styles/EditForms.module.css';
import btnStyles from '../styles/Button.module.css';

function PlaylistEditForm() {
  const [playlistData, setPlaylistData] = useState({
    owner_id: '',
    title: '',
    description: '',
    image: '',
    spotify_id: '',
    iframe_uri: '',
    url: '',
  });
  const { owner_id, title, description, image, spotify_id, iframe_uri, url } =
    playlistData;

  const { id } = useParams();
  const history = useHistory();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`playlists/${id}`);
        console.log(data);
        const {
          is_owner,
          owner_id,
          title,
          description,
          image,
          spotify_id,
          iframe_uri,
          url,
        } = data;

        is_owner
          ? setPlaylistData({
              owner_id,
              title,
              description,
              image,
              spotify_id,
              iframe_uri,
              url,
            })
          : history.push(`/playlist/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (e) => {
    setPlaylistData({
      ...playlistData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);

    // Currently non-editable fields; but payload requires them
    formData.append('spotify_id', spotify_id);
    formData.append('image', image);
    formData.append('url', url);
    formData.append('iframe_uri', iframe_uri);

    try {
      await axiosReq.put(`playlists/${id}`, formData);
      history.push(`/playlist/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <Profile userId={owner_id} />
      <Form onSubmit={handleSubmit}>
        <Container className={styles.Container}>
          <Row>
            <Col>
              <h4>Edit Playlist</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className={styles.FormGroup}>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleChange}
                  className={styles.FormControl}
                />
              </Form.Group>
              {errors?.title?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                  {message}
                </Alert>
              ))}
            </Col>
          </Row>
          <Row className={styles.Playlist}>
            <Col>
              <Playlist image={image} title={title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className={styles.FormGroup}>
                <Form.Label>
                  If you like, some details about this playlist:
                </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  name='description'
                  value={description}
                  placeholder='How does this playlist make you feel? Where do you most enjoy listening to it?...'
                  onChange={handleChange}
                  className={styles.FormControl}
                />
              </Form.Group>
              {errors?.description?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                  {message}
                </Alert>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type='submit' className={btnStyles.Button}>
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default PlaylistEditForm;
