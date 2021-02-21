import axios from 'axios';
import { FOOD_LIST_REQUEST, FOOD_LIST_SUCCESS, FOOD_LIST_FAILURE } from '../constants/foodConstants';

export const getFoods = () => (dispatch) => {
    dispatch({
        type: FOOD_LIST_REQUEST
    });

    axios.get('/api/foods/')
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