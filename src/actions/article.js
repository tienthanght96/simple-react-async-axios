import { ARTICLE_SUBMITTED, ARTICLE_PAGE_LOADED } from "../constants/actionType";
import { apiArticle } from "../api/";
import axios from '../axios/'
export const onCreateArticle = article => {
  return async dispatch => {
    try {
      const response = await apiArticle.onCreateArticle(article);
      if (response.data) {
        dispatch({ type: ARTICLE_SUBMITTED, status: "success" });
        return { status: "success", article: response.data.article };
      }
    } catch (error) {
      return error.response.data.errors;
    }
  };
};
export const onUpdateArticle = (slug, article) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onUpdateArticle(slug, article);
      if (response.data) {
        dispatch({ type: ARTICLE_SUBMITTED, status: "success" });
        return { status: "success", article: response.data.article };
      }
    } catch (error) {
      return { status: "error", error: error.response.data.errors };
    }
  };
};
export const onLoadArticle =  (slug) => {
  return async dispatch => {
    try {
     const response = await apiArticle.onLoadArticle(slug);
     if(response.data){
      dispatch({ type : ARTICLE_PAGE_LOADED, article: response.data.article});
      return { status: "success", article: response.data.article };
     }
    } catch (error) {
      return { status: "error", error: error.response.data.errors };
    }
  }
};