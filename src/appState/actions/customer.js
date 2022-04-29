import {
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_ALL_CUSTOMER_INFO_FAIL,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
  ADD_USER_ADDRESS_TO_CUSTOMER_SUCCESS,
  ADD_USER_ADDRESS_TO_CUSTOMER_FAIL,
  UPDATE_ADDRESS_DETAIL_SUCCESS,
  UPDATE_ADDRESS_DETAIL_FAIL,
  DELETE_ADDRESS_DETAIL_SUCCESS,
  DELETE_ADDRESS_DETAIL_FAIL,
  GET_ALL_CUSTOMER_INFO_SUCCESS,
} from '../types';

export const fetch_all_customer = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const body = JSON.stringify({});
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/customer/address/search',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );
    const data = await apiRes.json();
    if (data.Status === 'Success') {
      dispatch({
        type: GET_ALL_CUSTOMER_INFO_SUCCESS,
        payload: data.Response,
      });
    } else {
      dispatch({
        type: GET_ALL_CUSTOMER_INFO_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_CUSTOMER_INFO_FAIL,
    });
  }
};

export const customer_id = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/customer/me',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await apiRes.json();
    if (data.Status === 'Success') {
      dispatch({
        type: GET_CUSTOMER_SUCCESS,
        payload: data.Response,
      });
    } else {
      dispatch({
        type: GET_CUSTOMER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAIL,
    });
  }
};

export const addCustomer = (customerDetail, customerId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const body = JSON.stringify(customerDetail);

  try {
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/address/add/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );
    const res = await apiRes.json();

    if (res?.Response !== null) {
      dispatch({
        type: ADD_USER_ADDRESS_SUCCESS,
      });
      const addressId = res?.Response?.Id;
      dispatch(AddAddressToCustomer(customerId, addressId));
    }
  } catch (error) {
    dispatch({
      type: ADD_USER_ADDRESS_FAIL,
    });
  }
};

export const AddAddressToCustomer =
  (customerId, AddressId) => async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const body = JSON.stringify({
        customerId: customerId,
        addressId: AddressId,
      });
      const apiRes = fetch(
        'http://stage-api.crossborderpickup.com/customer/address/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const res = await apiRes.json();
      if (res?.Response !== null) {
        dispatch({
          type: ADD_USER_ADDRESS_TO_CUSTOMER_SUCCESS,
          payload: res?.Response,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_USER_ADDRESS_TO_CUSTOMER_FAIL,
      });
    }
  };

export const userAddress = (addressIdsList) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const promiseAll = addressIdsList?.map((addressId) =>
    fetch(
      `http://stage-api.crossborderpickup.com/address/get?id=${addressId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json())
  );
  try {
    const apiRes = await Promise.all(promiseAll);
    dispatch({
      type: GET_USER_ADDRESS_SUCCESS,
      payload: apiRes,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ADDRESS_FAIL,
    });
  }
};

export const updateUserAddress = (updatedAddress) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const body = JSON.stringify(updatedAddress);

  try {
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/address/update/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );
    const data = await apiRes.json();
    if (data !== null) {
      dispatch({
        type: UPDATE_ADDRESS_DETAIL_SUCCESS,
      });
    }
    dispatch(userAddress());
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_DETAIL_FAIL,
    });
  }
};

export const delAddress = (customerId, delAddressId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const body = JSON.stringify({
      CustomerId: customerId,
      Id: delAddressId,
    });
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/customer/address/delete/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );
    if (apiRes.status === 200) {
      dispatch({
        type: DELETE_ADDRESS_DETAIL_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_DETAIL_FAIL,
    });
  }
};
