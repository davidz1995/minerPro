import '../styles/navBar.css'
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div style={{position:'absolute', zIndex:10, width:'100%'}}>
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{paddingTop:'2em', paddingBottom:'1.5em' }}>
        <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link className="nav_link_container"><Link to="/" className='linkNavBar'>Minería - GPU vs ASIC</Link></Nav.Link>
            <p className='divider'>|</p>
            <Nav.Link className="nav_link_container"><Link to="/router" className='linkNavBar'>Nuestros productos</Link></Nav.Link>
            <p className='divider'>|</p>
            <Nav.Link className="nav_link_container"><Link to="/" className='linkNavBar'>FAQ</Link></Nav.Link>
            <p className='divider'>|</p>
            <Nav.Link className="nav_link_container"><Link to="/" className='linkNavBar'>Contacto</Link></Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
    )
}

export default NavBar
