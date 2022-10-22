import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import personnel from './reducers/personnel';
import service from './reducers/service';
import serviceType from './reducers/serviceType';

const reducer = combineReducers({
    // here we will be adding reducers
    personnel: personnel,
    service: service,
    serviceType: serviceType,
});
const store = configureStore({
    reducer,
});
export default store;
