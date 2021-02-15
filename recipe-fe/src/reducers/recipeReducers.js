import { RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAILURE, 
    RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAILURE } from '../constants/recipeConstants';

export const recipeListReducer = (state = { recipes: []}, action) => {
    switch(action.type) {
        case RECIPE_LIST_REQUEST:
            return {
                loading: true,
                ...state
            }
        case RECIPE_LIST_SUCCESS:
            return {
                loading: false,
                recipes: action.payload
            }
        case RECIPE_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const recipeDetailsReducer = (state = { recipe: {}}, action) => {
    switch(action.type) {
        case RECIPE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case RECIPE_DETAILS_SUCCESS:
            return {
                loading: false,
                recipe: action.payload
            }
        case RECIPE_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}