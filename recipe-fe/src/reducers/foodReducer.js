import { FOOD_LIST_REQUEST, FOOD_LIST_SUCCESS, FOOD_LIST_FAILURE } from '../constants/foodConstants';

export const foodsListReducer = (state = { foods: []}, action) => {
    switch(action.type) {
        case FOOD_LIST_REQUEST:
            return {
                loading: true,
                ...state
            }
        case FOOD_LIST_SUCCESS:
            return {
                loading: false,
                foods: action.payload
            }
        case FOOD_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}