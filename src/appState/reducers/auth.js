import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  LOGOUT_SUCCESS,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.AccessToken);
      localStorage.setItem('refreshToken', payload.RefreshToken);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case AUTHENTICATION_SUCCESS:
      localStorage.setItem('token', payload.AccessToken);
      localStorage.setItem('refreshToken', payload.RefreshToken);
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case AUTHENTICATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
