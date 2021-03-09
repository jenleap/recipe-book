import axios from 'axios';
import { RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAILURE,
    RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAILURE,
    RECIPE_CREATE_REQUEST, RECIPE_CREATE_SUCCESS, RECIPE_CREATE_FAILURE, RECIPE_CREATE_RESET } from '../constants/recipeConstants';

export const getRecipes = () => (dispatch) => {
    dispatch({
        type: RECIPE_LIST_REQUEST
    });

    axios.get('/api/recipes/')
            .then(res => {
                dispatch({
                    type: RECIPE_LIST_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: RECIPE_LIST_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}

export const getRecipe = (id) => (dispatch) => {
    dispatch({
        type: RECIPE_DETAILS_REQUEST
    });

    axios.get(`/api/recipes/${id}`)
            .then(res => {
                dispatch({
                    type: RECIPE_DETAILS_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: RECIPE_DETAILS_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}

export const createRecipe = (recipeData) => (dispatch, getState) => {
    dispatch({
        type: RECIPE_CREATE_REQUEST
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

    axios.post(`/api/recipes/create`, recipeData, config)
            .then(res => {
                dispatch({
                    type: RECIPE_CREATE_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: RECIPE_CREATE_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}