import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { AddToAlbum } from "../albums/AddToAlbum";
import { FolderPlus } from './icons/FolderPlus';
import { EditImage } from './icons/EditImage';
import { Link } from "react-router-dom";
import styles from './styling/ImageMenu.module.css';

export function ImageMenu(props) {
  const {className, imageData} = props;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
          <Dropdown.Item onClick={() => setShowModal(true)}>
            <FolderPlus />
            <span className="px-2">Add to Album</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={`/edit?publicId=${encodeURIComponent(imageData.public_id)}`}>
            <EditImage />
            <span className="px-2">Edit</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 

      <AddToAlbum 
        showModal={showModal} 
        closeModal={toggleModal}
        imageData={imageData}
        className={`position-absolute ${styles.menuIcon}`}
      />
    </div>
  )
}