import React from 'react'
import {Nav, Navbar, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function MainNavbar({isAuthorized}) {
  return (    
    
        <Navbar bg='light' expand='lg'>
        <Container>
            <Navbar.Brand href="/main">
                Myhac
            </Navbar.Brand>
                {isAuthorized ?
                    <Nav>
                    <Nav.Link as={Link} to='/map'>
                        Map
                    </Nav.Link>
                    <Nav.Link as={Link} to='/city'>
                        Choose the city
                    </Nav.Link>
                    <Nav.Link as={Link} to='/main-info'>
                        Additional info
                    </Nav.Link>
                    <Nav.Link as={Link} to='/signout'>
                        Sign out 
                    </Nav.Link>
                    </Nav>
                    : 
                    <Nav>
                        <Nav.Link as={Link} to='/login'>
                            Sign in  
                        </Nav.Link>
                        <Nav.Link as={Link} to='/register'>
                            Sign up  
                        </Nav.Link>  
                    </Nav>
                }
                 </Container>
        </Navbar>
  )
       
}
