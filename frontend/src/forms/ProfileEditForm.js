import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { axiosReq } from '../api/axiosDefaults';
import Profile from '../components/Profile';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import styles from '../styles/EditCreateForms.module.css';
import btnStyles from '../styles/Button.module.css';

function ProfileEditForm() {
  const { userId } = useParams();
  const history = useHistory();
  const profileImageInput = useRef(null);
  const backgroundImageInput = useRef(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`profiles/${userId}`);
        const { is_owner } = data;

        if (!is_owner) {
          history.push(`/profile/${userId}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (profileImageInput?.current?.files[0]) {
      formData.append('image', profileImageInput.current.files[0]);
    }
    if (backgroundImageInput?.current?.files[0]) {
      formData.append('background', backgroundImageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`profiles/${userId}`, formData);
      history.push(`/profile/${userId}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <Profile userId={userId} />
      <Form onSubmit={handleSubmit}>
        <Container className={styles.Container}>
          <Row className='justify-content-center'>
            <Form.Group className={styles.FormGroup}>
              <Col>
                <Form.Label
                  className={btnStyles.Button}
                  htmlFor='profile-image-upload'
                >
                  Change profile image
                </Form.Label>

                <Form.File
                  className={styles.TextAlignLast}
                  id='profile-image-upload'
                  accept='image/*'
                  ref={profileImageInput}
                />
              </Col>
            </Form.Group>
          </Row>
          {errors?.image?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
          <br />
          <Row className='justify-content-center'>
            <Form.Group className={styles.FormGroup}>
              <Col>
                <Form.Label
                  className={btnStyles.Button}
                  htmlFor='background-image-upload'
                >
                  Change background image
                </Form.Label>

                <Form.File
                  className={styles.TextAlignLast}
                  id='background-image-upload'
                  accept='image/*'
                  ref={backgroundImageInput}
                />
              </Col>
            </Form.Group>
          </Row>
          {errors?.background?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
          <Button type='submit' className={btnStyles.Button}>
            Save
          </Button>
        </Container>
      </Form>
    </>
  );
}

export default ProfileEditForm;
