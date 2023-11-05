import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styling/MenuIcon.module.css';
import Modal from 'react-bootstrap/Modal';
import { FolderPlus } from './FolderPlus';

export function MenuIcon(props) {
  const {className} = props;
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
          <Dropdown.Item href="#/action-1">
            <FolderPlus />
            <span className="px-2">Add to Album</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}