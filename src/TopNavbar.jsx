import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
function TopNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid>
        <Navbar.Brand >URL Shortner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to={"/shortenurl"}>Shorten URL</Nav.Link>
            <Nav.Link as={Link} to={"/myurls"}>My URLS</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar>
  );
}
export default TopNavbar;