import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { recipeListReducer, recipeDetailsReducer, recipeCreateReducer } from './reducers/recipeReducers';
import { foodsListReducer } from './reducers/foodReducers';
import { userLoginReducer, userRegisterReducer, userProfileReducer, userUpdateReducer } from './reducers/userReducers';

const reducer = combineReducers({
    recipeList: recipeListReducer,
    recipeDetails: recipeDetailsReducer,
    recipeCreate: recipeCreateReducer,
    foodsList: foodsListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdate: userUpdateReducer
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