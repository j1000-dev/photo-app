import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";

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
        <MenuItem component={<Link to="/gallery" />}>Gallery</MenuItem>
        <MenuItem component={<Link to="/favorites" />}>Favorites</MenuItem>
        <MenuItem component={<Link to="/albums" />}>Albums</MenuItem>
      </Menu>
    </Sidebar>
  )
}

export default SideNavBar