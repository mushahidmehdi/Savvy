import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
} from '../types';

export const login = (Username, password) => async (dispatch) => {
  const body = JSON.stringify({ Username, password });
  try {
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/identity/registration/signIn/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      }
    );

    const data = await apiRes.json();
    if (data.Response !== null) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.Response,
      });
      if (localStorage.getItem('token') !== null) {
        dispatch(get_user());
      }
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const get_user = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/identity/user/me/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await apiRes.json();
    if (data.Response !== null) {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: data.Response,
      });
    } else {
      dispatch({
        type: GET_USER_INFO_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_USER_INFO_FAIL,
    });
  }
};

export const check_authentication = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('refreshToken');
    const body = JSON.stringify({
      RefreshToken: token,
    });
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/identity/registration/refreshtoken/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }
    );
    const data = await apiRes.json();
    if (data.Response !== null) {
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: data.Response,
      });
      dispatch(get_user());
    } else {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const body = JSON.stringify(user);
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/identity/user/update',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );
    const resp = await apiRes.json();
    if (resp.Status === 'Success') {
      dispatch({
        type: UPDATE_USER_INFO_SUCCESS,
        payload: resp?.Response,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_INFO_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const apiRes = await fetch(
      'http://stage-api.crossborderpickup.com/identity/registration/signout/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
