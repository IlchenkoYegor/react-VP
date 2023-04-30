import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";
import { hasAuthorities } from "../../securityUtils/hasAuthorities";

function MainNavbar({ security, logout }) {
  function onLogout() {
    logout();
    window.location("/");
  }

  const { validToken, user } = security;
  const userIsAuthenticated = (
    <Nav>
      {validToken && hasAuthorities(user, "ADMIN") && (
        <Nav.Link as={Link} to="/map">
          Map
        </Nav.Link>
      )}
      {validToken && hasAuthorities(user, "ADMIN") && (
        <Nav.Link as={Link} to="/addTheCity">
          Add the city
        </Nav.Link>
      )}
      {validToken && hasAuthorities(user, "ADMIN") && (
        <Nav.Link as={Link} to="/users">
          Users info
        </Nav.Link>
      )}
      {validToken && hasAuthorities(user, "VOLUNTEER") && (
        <Nav.Link as={Link} to="/city">
          Choose the city
        </Nav.Link>
      )}

      <Nav.Link as={Link} to="/main-info">
        Additional info
      </Nav.Link>
      <Nav.Link as={Link} onClick={onLogout} to="/">
        Log out
      </Nav.Link>
    </Nav>
  );

  const userIsNotAuthenticated = (
    <Nav>
      <Nav.Link as={Link} to="/login">
        Sign in
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Sign up
      </Nav.Link>
    </Nav>
  );
  let headerLinks;
  if (validToken && user) {
    headerLinks = userIsAuthenticated;
  } else {
    headerLinks = userIsNotAuthenticated;
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/main">
          Myhac
        </Navbar.Brand>
        {headerLinks}
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    security: state.security,
  };
};

export default connect(mapStateToProps, { logout })(MainNavbar);
