import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../styles/ModalWindow.module.css';
import btnStyles from '../styles/Button.module.css';

/**
 * ModalWindow component renders a modal window.
 *
 * Must be used with the following props:
 * - show={modalShow}
 * - onHide={() => setModalShow(false)}
 * - onConfirm: custom function
 * - title: string
 * - body: JSX
 */
function ModalWindow(props) {
  return (
    <Modal {...props} size='sm' aria-labelledby='confirmation modal' centered>
      <Modal.Header className={styles.Header} closeButton>
        <Modal.Title id='confirmation modal' className={styles.Color}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.Body}>{props.body}</Modal.Body>
      <Modal.Footer className={styles.Footer}>
        <Button onClick={props.onHide} className={btnStyles.Button}>
          Close
        </Button>
        <Button onClick={props.onConfirm} className={btnStyles.Button}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
