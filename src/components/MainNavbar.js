import React from 'react'
import {Nav, Navbar, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { logout } from '../actions/securityActions'
import { connect } from 'react-redux'



function MainNavbar({security,logout}) {
    function onLogout(){
       logout();
       window.location("/");
    }

    const {validToken, user} = this.props.security;
    const userIsAuthenticated = (<Nav>
        <Nav.Link as={Link} to='/map'>
            Map
        </Nav.Link>
        <Nav.Link as={Link} to='/city'>
            Choose the city
        </Nav.Link>
        <Nav.Link as={Link} to='/main-info'>
            Additional info
        </Nav.Link>
        <Nav.Link as={Link} onClick={onLogout} to='/signout'>
            Log out 
        </Nav.Link>
        </Nav>)

        const userIsNotAuthenticated = (
            <Nav>
            <Nav.Link as={Link} to='/login'>
                Sign in  
            </Nav.Link>
            <Nav.Link as={Link} to='/register'>
                Sign up  
            </Nav.Link>  
        </Nav>
        )
        let headerLinks;
        if(validToken && user){
            headerLinks = userIsAuthenticated;
        }else{
            headerLinks = userIsNotAuthenticated;
        }
  return (    
    
        <Navbar bg='light' expand='lg'>
        <Container>
            <Navbar.Brand as={Link} to="/main">
                Myhac
            </Navbar.Brand>
            {headerLinks}
        </Container>
        </Navbar>
  )
       
}

const mapStateToProps = (state) =>{
    return {
        security: state.security
    }
}

export default connect(mapStateToProps, {logout})(MainNavbar)