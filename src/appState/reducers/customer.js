import {
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  UPDATE_ADDRESS_DETAIL_SUCCESS,
  GET_ALL_CUSTOMER_INFO_SUCCESS,
  GET_ALL_CUSTOMER_INFO_FAIL,
  GET_ALL_CUSTOMER_INFO_DETAIL_FAIL,
  GET_ALL_CUSTOMER_INFO_DETAIL_SUCCESS,
} from '../types';

const initialState = {
  customers: null,
  userCustomer: null,
  allCutomerDetail: [],
  address: null,
};

export const customReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        userCustomer: payload,
      };
    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        userCustomer: null,
      };
    case GET_ALL_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        customers: payload,
      };
    case GET_ALL_CUSTOMER_INFO_DETAIL_SUCCESS:
      return {
        ...state,
        allCutomerDetail: payload,
      };
    case UPDATE_ADDRESS_DETAIL_SUCCESS:
      return {
        ...state,
      };
    case GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
      };
    case GET_USER_ADDRESS_FAIL:
      return {
        ...state,
        address: null,
      };
    case GET_ALL_CUSTOMER_INFO_FAIL:
      return {
        ...state,
        customers: null,
      };
    case GET_ALL_CUSTOMER_INFO_DETAIL_FAIL:
      return {
        ...state,
        allCutomerDetail: [],
      };
    default:
      return state;
  }
};
