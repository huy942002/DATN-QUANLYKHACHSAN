import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import personnel from './reducers/personnel';
import service from './reducers/service';
import serviceType from './reducers/serviceType';
import handOver from './reducers/handOver';
import facility from './reducers/facilities';
import rentalType from './reducers/rentalType';
import numberOfFloor from './reducers/numberOfFloor';
import handOverBill from './reducers/handOverBill';
import nationality from './reducers/nationality';
import loginAdmin from './reducers/loginAdmin';
import resetHandOver from './reducers/resetHandOver';
import customer from './reducers/customer';

const reducer = combineReducers({
    // here we will be adding reducers
    personnel: personnel,
    service: service,
    facility: facility,
    serviceType: serviceType,
    numberOfFloor: numberOfFloor,
    handOver: handOver,
    rentalType: rentalType,
    nationality: nationality,
    loginAdmin: loginAdmin,
    handOverBill: handOverBill,
    resetHandOver: resetHandOver,
    customer: customer,
});
const store = configureStore({
    reducer,
});
export default store;
