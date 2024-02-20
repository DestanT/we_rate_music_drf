// CREDIT: Code taken from Code Institute's "Moments" walkthrough project
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import { setTokenTimestamp } from '../../utils/dataUtils';

import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect();

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      console.log(data);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push(`/profile/${data.user.profile_id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Row className={styles.Row}>
        <Col className='my-auto py-2 p-md-2'>
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>sign in</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='username'>
                <Form.Label className='d-none'>Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant='warning'>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId='password'>
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert key={idx} variant='warning'>
                  {message}
                </Alert>
              ))}

              <Button className={btnStyles.Button} type='submit'>
                Sign in
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant='warning' className='mt-3'>
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to='/signup'>
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
