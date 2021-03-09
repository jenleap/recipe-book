import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../../actions/userActions';

function Header() {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

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

                            { userInfo ? (
                                <NavDropdown title={ userInfo.name } id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={ logoutHandler }>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user mr-1"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}

                            { (userInfo && userInfo.isAdmin) ? (
                                <NavDropdown title="Admin" id="admin-menu">
                                    <LinkContainer to="/recipe/create">
                                        <Nav.Link>Create Recipe</Nav.Link>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : null }
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
