import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { Heart } from "../components/icons/Heart";
import { Image } from '../components/icons/Image';
import { Folder } from '../components/icons/Folder';
import styles from './SideNavBar.module.css';

function SideNavBar() {
  const [broken, setBroken] = useState(false);
  const [toggled, setToggled] = useState(false);

  const menuItemStyles = {
    button: {
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#5A5A5A',
        color: '#FFFFFF',
      },
      fontSize: '16px',
      paddingLeft: '10px',
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <>
    <Sidebar 
      toggled={toggled}
      style={{height: '100vh', borderRight: 'none'}} 
      backgroundColor='#000000'  
      breakPoint="md" 
      onBreakPoint={setBroken}
      onBackdropClick={() => setToggled(false)}
    >
      <Menu menuItemStyles={menuItemStyles}>
        <h5 style={{fontWeight: 500, color: '#FFFFFF'}} className='ps-4 py-3'>Manage</h5>
        <MenuItem component={<Link to="/gallery" />}>
          <div>
            <Image />
            <span className={styles.title}>Gallery</span>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/albums" />}>
          <div>
            <Folder />
            <span className={styles.title}>Albums</span>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/favorites" />}>
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="25" 
              height="25" 
              fill='#FFFFFF'
              className="bi bi-heart" 
              viewBox="0 0 16 16"
              >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            <span className={styles.title}>Favorites</span>
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
    <div className="main">
      <div style={{ marginBottom: '16px' }}>
        {broken && (
          <button className="btn btn-secondary m-3" onClick={() => setToggled(!toggled)}>
            Manage
          </button>
        )}
      </div>
    </div>
    </>
  )
}

export default SideNavBar