import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import FormContainer from '../components/common/FormContainer';
import { register } from '../actions/userActions';

function Register({location, history}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Password does not match.")
        } else {
            const userData = {
                'name': name,
                'email': email,
                'username': username,
                'password': password
            };
    
            dispatch(register(userData));
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>

            {message && <Message variant="danger">{ message }</Message>}
            {error && <Message variant="danger">{ error }</Message>}
            {loading && <Loader />}

            <Form onSubmit={ submitHandler }>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={ name }
                        onChange={(e) => setName(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={ confirmPassword }
                        onChange={(e) => setConfirmPassword(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>

                <Row className="py-3">
                <Col>
                    Have an account?  
                    <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>
                         Sign in here. 
                    </Link>
                </Col>
            </Row>
            </Form>

        </FormContainer>
    )
}

export default Register
