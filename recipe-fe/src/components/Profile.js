import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import FormContainer from '../components/common/FormContainer';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';



function Profile({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const userProfile = useSelector(state => state.userProfile);
    const { error, loading, user } = userProfile;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name || userUpdate.success) {
                dispatch({
                    type: USER_UPDATE_RESET
                });

                dispatch(getUserProfile('profile'));
            } else {
                setName(user.name);
                setUsername(user.username);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, userUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Password does not match.")
        } else {
            setMessage('');

            const userData = {
                'id': user.id,
                'name': name,
                'email': email,
                'username': username,
                'password': password
            };
    
            dispatch(updateUserProfile(userData));
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
            </Col>
        </Row>
    )
}

export default Profile
