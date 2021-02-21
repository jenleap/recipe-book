import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import FormContainer from '../components/common/FormContainer';
import { login } from '../actions/userActions';

function Login({ location, history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        const loginData = {
            'username': username,
            'password': password
        };

        dispatch(login(loginData));
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {error && <Message variant="danger">{ error }</Message>}
            {loading && <Loader />}

            <Form onSubmit={ submitHandler }>
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
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    No account?  
                    <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
                         Sign up here. 
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
