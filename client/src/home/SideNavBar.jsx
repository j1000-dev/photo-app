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
            <Heart className='d-inline'/>
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