import { LOGIN, REGISTER, LOGOUT, UPDATE_FIELD_AUTH, SETTINGS_SAVED } from "../constants/actionType";
import { apiAuth } from "../api/";

export const login = user => {
  return async dispatch => {
    try {
      const response = await apiAuth.onLogin(user);
      if (response.data) {
        dispatch({
          type: LOGIN,
          user: response.data.user,
          token: response.data.user.token
        });
        localStorage.setItem("token", response.data.user.token);
        return { status: "success", data: response.data.user };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
};
export const register = user => {
  return async dispatch => {
    try {
      const response = await apiAuth.onRegister(user);
      if (response.data) {
        dispatch({
          type: REGISTER,
          user: response.data.user,
          token: response.data.user.token
        });
        localStorage.setItem("token", response.data.user.token);
        return { status: "success", data: response.data.user };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
};
export const updateUser = user => {
  return async dispatch => {
    try {
      const response = await apiAuth.onUpdateUser(user);
      if (response.data) {
        dispatch({
          type: SETTINGS_SAVED,
          user: response.data.user,
          token: response.data.user.token
        });
        return { status: "success", data: response.data.user };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
};
export const logout = () => {
  return async dispatch => {
    await dispatch({
      type: LOGOUT,
      status: "success"
    });
    localStorage.setItem("token", "");
    return { status: "sucess" };
  };
};
