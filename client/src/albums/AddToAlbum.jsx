import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../components/styling/ImageMenu.module.css';
import axios from "axios";

export function AddToAlbum(props) {
  const {className, imageData, showModal, closeModal} = props;
  const [albumName, setAlbumName] = useState("");

  return (
    <div className={className}>
      <Modal 
        show={showModal} 
        onHide={closeModal} 
        centered={true}
        contentClassName={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add to Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="albumName">
              <Form.Label>Type an album you want to move this image to</Form.Label>
              <Form.Control
                onChange={(e) => setAlbumName(e.target.value)}
                value={albumName}
                type="text"
                placeholder="family"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={async () => {
              closeModal(); 
              await axios.post('/add-image-to-album', {
                imageData,
                albumName
              });
            }}
          >
            Add to album
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}