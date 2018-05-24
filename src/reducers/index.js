import { combineReducers } from 'redux';
import article from './article ';
import common from './common';
import auth from './auth';
import tags from './tags';

export const RootReducer = combineReducers({
  Article : article,
  Common : common,
  Auth : auth,
  Tags : tags
});
