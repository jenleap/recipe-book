import axios from 'axios';
import { FOOD_LIST_REQUEST, FOOD_LIST_SUCCESS, FOOD_LIST_FAILURE, FOOD_LIST_RESET } from '../constants/foodConstants';

export const getFoods = (query = '') => (dispatch) => {
    dispatch({
        type: FOOD_LIST_REQUEST
    });

    console.log(query);

    axios.get(`/api/foods?q=${query}`)
            .then(res => {
                dispatch({
                    type: FOOD_LIST_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: FOOD_LIST_FAILURE,
                    payload: err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
                });
            });
}

export const clearFoodsList = () => (dispatch) => {
    dispatch({
        type: FOOD_LIST_RESET
    });
}