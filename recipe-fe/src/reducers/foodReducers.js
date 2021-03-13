import { FOOD_LIST_REQUEST, FOOD_LIST_SUCCESS, FOOD_LIST_FAILURE, FOOD_LIST_RESET } from '../constants/foodConstants';

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
                foods: action.payload.foods,
                page: action.payload.page,
                totalPages: action.payload.totalPages
            }
        case FOOD_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case FOOD_LIST_RESET:
                return {}
        default:
            return state;
    }
}