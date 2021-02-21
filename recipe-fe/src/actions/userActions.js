import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../constants/userConstants';

export const login = (loginData) => (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    axios.post('/api/users/login/', loginData, config)
            .then(res => {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.data
                });

                localStorage.setItem('userInfo', JSON.stringify(res.data));
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}