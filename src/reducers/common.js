import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_ARTICLE,
  ARTICLE_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionType';

const initialState = {
  appName: 'Conduit',
  token: null,
  user : null,
  viewChangeCounter: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        user: action.user ? action.user : null
      };
      case REGISTER: 
      case LOGIN:
        return {
          ...state,
          user: action.user,
          token: action.token
        };
      case LOGOUT:
        return {
          ...state,
          user: null,
          token: null
        };
      case SETTINGS_SAVED:
        return {
          ...state,
          user: action.user,
        };
     default: return state;
  }
};
