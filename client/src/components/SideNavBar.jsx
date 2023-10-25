import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { Heart } from "./icons/Heart";
import { Image } from './icons/Image';
import { Folder } from './icons/Folder';

function SideNavBar() {
  return (
    <Sidebar style={{height: '100vh'}}>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <h5 className='px-4'>Manage</h5>
        <MenuItem component={<Link to="/gallery" />}>
          <div>
            <Image />
            <span style={{fontSize: '16px', paddingLeft: '10px'}}>Gallery</span>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/albums" />}>
          <div>
            <Folder />
            <span style={{fontSize: '16px', paddingLeft: '10px'}}>Albums</span>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/favorites" />}>
          <div>
            <Heart className='d-inline'/>
            <span style={{fontSize: '16px', paddingLeft: '10px'}}>Favorites</span>
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}

export default SideNavBar