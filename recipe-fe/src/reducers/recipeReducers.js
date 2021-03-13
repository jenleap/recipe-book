import { RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAILURE, 
    RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAILURE,
    RECIPE_CREATE_REQUEST, RECIPE_CREATE_SUCCESS, RECIPE_CREATE_FAILURE, RECIPE_CREATE_RESET } from '../constants/recipeConstants';

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
                recipes: action.payload.recipes,
                page: action.payload.page,
                totalPages: action.payload.totalPages
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

export const recipeCreateReducer = (state = { recipe: {}}, action) => {
    switch(action.type) {
        case RECIPE_CREATE_REQUEST:
            return {
                loading: true
            }
        case RECIPE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                recipe: action.payload
            }
        case RECIPE_CREATE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case RECIPE_CREATE_RESET:
            return {}
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