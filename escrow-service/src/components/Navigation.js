import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav variant="pills" defaultActiveKey="home">
        <Nav.Item>
          <Nav.Link eventKey="home" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="buyer" as={Link} to="/buyer">Buyer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="agent" as={Link} to="/agent">Agent</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;


