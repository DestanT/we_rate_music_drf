import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { axiosReq } from '../api/axiosDefaults';
import { useRedirect } from '../hooks/useRedirect';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import styles from '../styles/EditCreateForms.module.css';
import btnStyles from '../styles/Button.module.css';

function FeedbackCreateForm() {
  useRedirect();

  const [feedbackData, setfeedbackData] = useState({
    title: '',
    feedback: '',
    image: '',
  });
  const { title, feedback } = feedbackData;
  const imageFile = useRef();

  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('feedback', feedback);
    if (imageFile?.current?.files[0]) {
      formData.append('image', imageFile?.current?.files[0]);
    }
    try {
      await axiosReq.post('feedback/', formData);
      setShowSuccess(true);
      setTimeout(() => {
        history.push('/');
      }, 4000);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  const handleChange = (event) => {
    setfeedbackData({
      ...feedbackData,
      [event.target.name]: event.target.value,
    });
  };

  const warmWelcome = (
    <>
      <Row className='pt-3'>
        <Col>
          <h1 className={styles.Title}>Welcome,</h1>
          <h3>and thank you for taking your time!</h3>
        </Col>
      </Row>
      <Row className={styles.HighlightedContainer}>
        <Col>
          <p>
            This is your chance to help us improve the app. A direct channel to
            the developers. Please be sensible and respectful. We appreciate
            your feedback and will consider all of your suggestions and
            implement them if possible.
          </p>
        </Col>
      </Row>
    </>
  );

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type='text'
          value={title}
          onChange={handleChange}
          name='title'
          placeholder='Please add a title'
          className={styles.FormControl}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Your feedback:</Form.Label>
        <Form.Control
          as='textarea'
          rows={6}
          value={feedback}
          onChange={handleChange}
          name='feedback'
          placeholder='Please add your feedback here (positive feedback is always welcome!)...'
          className={styles.FormControl}
        />
      </Form.Group>
      {errors?.feedback?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  return (
    <Container className={styles.OverflowHidden}>
      <Container>{warmWelcome}</Container>
      <Form
        onSubmit={handleSubmit}
        style={{ 'margin-bottom': '76px', 'padding-bottom': '10px' }}
      >
        <Row>
          <Col>
            <Container>{textFields}</Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Form.Group>
                <Form.Label htmlFor='image-upload'>
                  Upload an image (optional):
                </Form.Label>
                <Form.File
                  className={styles.TextAlignLast}
                  id='image-upload'
                  ref={imageFile}
                  accept='image/*'
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setfeedbackData({
                        ...feedbackData,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
                {errors?.image?.map((message, idx) => (
                  <Alert variant='warning' key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>
            </Container>
          </Col>
        </Row>
        <Button className={btnStyles.Button} onClick={() => history.goBack()}>
          Cancel
        </Button>
        <Button className={btnStyles.Button} type='submit'>
          Submit
        </Button>
        {showSuccess && (
          <Container className='pt-3'>
            <Alert
              variant='success'
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              Feedback submitted, Thank you! You will be directed back to your
              profile shortly.
            </Alert>
          </Container>
        )}
      </Form>
    </Container>
  );
}

export default FeedbackCreateForm;
