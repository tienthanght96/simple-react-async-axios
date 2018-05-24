import { LOAD_TAG } from "../constants/actionType";
import { apiTags } from "../api/";

export const loadTags = () => {
  return async dispatch => {
    try {
      const response = await apiTags.onLoadAllTags();
      if (response.data) {
        dispatch({
          type: LOAD_TAG,
          status: "success",
          tags: response.data.tags
        });
        return { status: "success", tags: response.data.tags };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
};
