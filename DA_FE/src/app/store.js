import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import user from './reducers/user';

const reducer = combineReducers({
    // here we will be adding reducers
    user,
});
const store = configureStore({
    reducer,
});
export default store;
