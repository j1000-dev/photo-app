import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FolderPlus } from './icons/FolderPlus';
import Form from 'react-bootstrap/Form';
import styles from './styling/AddToAlbum.module.css';
import axios from "axios";

export function AddToAlbum(props) {
  const {className, imageData} = props;
  const [show, setShow] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)};


  return (
    <div className={className}>
      <Dropdown>
        <Dropdown.Toggle 
          variant="secondary" 
          id="dropdown-basic" 
          size="sm"
          className={styles.dropdownToggle}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="25px" 
          height="25px"
          strokeWidth={1.5}
          stroke="#FFFFFF"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu data-bs-theme="dark">
          <Dropdown.Item onClick={handleShow}>
            <FolderPlus />
            <span className="px-2">Add to Album</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 

      <Modal 
        show={show} 
        onHide={handleClose} 
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
            handleClose();
            await axios.post('/add-image-to-album', {
              imageData,
              albumName
            })
          }}>
            Add to album
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}