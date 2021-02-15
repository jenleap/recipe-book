import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" className="m-3" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Recipe Book</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/recipe/create">
                                <Nav.Link>Create</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user mr-1"></i>Login</Nav.Link>
                            </LinkContainer>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
