import {Navbar, Nav} from 'react-bootstrap';
import Logout from "../components/Logout";

function TopNavBar(props) {
  const { user } = props;
  
  return (
    <Navbar expand="lg" className="bg-black" style={{ borderBottom: '1px solid white' }}>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-between">
        <Navbar.Brand style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '24px', paddingLeft: '15px' }} href="/">
          Photo App
        </Navbar.Brand>
        <Nav>
          <Navbar.Collapse className="justify-content-end">
            <img width="50" height="50" src={user.picture} alt={user.name} />
            <Navbar.Text className='text-white px-3'>
              {user.name}
            </Navbar.Text>
          </Navbar.Collapse>
          <Logout />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopNavBar