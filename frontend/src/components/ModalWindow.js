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
function ModalWindow({ title, body, onHide, onConfirm, ...show }) {
  return (
    <Modal {...show} size='sm' aria-labelledby='confirmation modal' centered>
      <Modal.Header className={styles.Header} closeButton>
        <Modal.Title id='confirmation modal' className={styles.Color}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.Body}>{body}</Modal.Body>
      <Modal.Footer className={styles.Footer}>
        <Button onClick={onHide} className={btnStyles.Button}>
          Close
        </Button>
        <Button onClick={onConfirm} className={btnStyles.Button}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
