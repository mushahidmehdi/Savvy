import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { customReducer } from './customer';

const reduers = {
  auth: authReducer,
  customers: customReducer,
};
export default combineReducers(reduers);
