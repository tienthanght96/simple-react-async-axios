import {
  LOAD_TAG,
  ADD_TAG
} from "../constants/actionType";

const initialState = {
  tags: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAG: 
      return {
        ...state,
        tags: action.tags,
      };
    default:
      return state;
  }
};
