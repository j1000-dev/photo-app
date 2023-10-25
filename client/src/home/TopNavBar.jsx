import Navbar from 'react-bootstrap/Navbar';

function TopNavBar() {
  return (
    <>
    <Navbar expand="lg" className="bg-black" style={{borderBottom: '1px solid white'}}>
        <Navbar.Brand style={{color: '#FFFFFF', fontWeight: 600, fontSize: '24px'}} className="ps-4" href="/">Photo App</Navbar.Brand>
        <Navbar.Toggle />
    </Navbar>
    </>
  )
}

export default TopNavBar