import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE, USER_PROFILE_RESET,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE } from '../constants/userConstants';

// TODO: Move this into config.
const userInfoKey = 'userInfo';

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

                localStorage.setItem(userInfoKey, JSON.stringify(res.data));
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

export const logout = () => (dispatch) => {
    localStorage.removeItem(userInfoKey);

    dispatch({
        type: USER_LOGOUT
    });

    dispatch({
        type: USER_PROFILE_RESET
    });
}

export const register = (userData) => (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    });

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    axios.post('/api/users/register/', userData, config)
            .then(res => {
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: res.data
                });

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.data
                });

                localStorage.setItem(userInfoKey, JSON.stringify(res.data));
            })
            .catch(err => {
                dispatch({
                    type: USER_REGISTER_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}

export const getUserProfile = (id) => (dispatch, getState) => {
    dispatch({
        type: USER_PROFILE_REQUEST
    });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${ userInfo.token }`
        }
    };

    axios.get(`/api/users/${ id }/`, config)
            .then(res => {
                dispatch({
                    type: USER_PROFILE_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: USER_PROFILE_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}

export const updateUserProfile = (userData) => (dispatch, getState) => {
    dispatch({
        type: USER_UPDATE_REQUEST
    });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${ userInfo.token }`
        }
    };

    axios.put(`/api/users/profile/update/`, userData, config)
            .then(res => {
                dispatch({
                    type: USER_UPDATE_SUCCESS,
                    payload: res.data
                });

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.data
                });

                localStorage.setItem(userInfoKey, JSON.stringify(res.data));
            })
            .catch(err => {
                dispatch({
                    type: USER_UPDATE_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}



