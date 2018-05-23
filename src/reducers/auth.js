import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED
} from "../constants/actionType";

const initialState = {
  user: null,
  token: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    /* case REGISTER: 
    case LOGIN:
    console.log("action", action)
      return {
        ...state,
        user: action.user,
        token: action.token
      }; */
    default:
      return state;
  }
};
