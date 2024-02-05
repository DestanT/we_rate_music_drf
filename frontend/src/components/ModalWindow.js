import React from 'react';
import { Button, Modal } from 'react-bootstrap';

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
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
