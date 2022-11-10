import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import personnel from './reducers/personnel';
import service from './reducers/service';
import serviceType from './reducers/serviceType';
import handOver from './reducers/handOver';
import handOverBill from './reducers/handOverBill';
import resetHandOver from './reducers/resetHandOver';

const reducer = combineReducers({
    // here we will be adding reducers
    personnel: personnel,
    service: service,
    serviceType: serviceType,
    handOver: handOver,
    handOverBill: handOverBill,
    resetHandOver: resetHandOver,
});
const store = configureStore({
    reducer,
});
export default store;
