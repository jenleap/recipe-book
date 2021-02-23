import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { recipeListReducer, recipeDetailsReducer } from './reducers/recipeReducers';
import { foodsListReducer } from './reducers/foodReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    foodsList: foodsListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;