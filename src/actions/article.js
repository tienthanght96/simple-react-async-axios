import { ARTICLE_SUBMITTED, ARTICLE_PAGE_LOADED, LOAD_ARTICLE_LIST, LOAD_ARTICLE_LIST_BY_TAG, LOAD_FEED_ARTICLE_LIST } from "../constants/actionType";
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
      return { status: "error", errors: error.response.data.errors };
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
      return { status: "error", errors: error.response.data.errors };
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
      return { status: "error", errors: error.response.data.errors };
    }
  }
};

export const onLoadArticleList = (page) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onLoadArticleList(page);
      if(response.data){
        return {status: 'success', articles : response.data.articles, articlesCount : response.data.articlesCount };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
}
export const onLoadArticleListByTag = (page, tag) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onLoadArticleListByTag(page, tag);
      if(response.data){
        return {status: 'success', articles : response.data.articles, articlesCount : response.data.articlesCount };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
}
export const onLoadArticleListByAuthor = (page, auth) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onLoadArticleListByAuthor(page, auth);
      if(response.data){
        return {status: 'success', articles : response.data.articles, articlesCount : response.data.articlesCount };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
}
export const onLoadFavoriteArticleListByUser = (page, auth) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onLoadFavoriteArticleListByUser(page, auth);
      if(response.data){
        return {status: 'success', articles : response.data.articles, articlesCount : response.data.articlesCount };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
}
export const onLoadFeedArticleList = (page) => {
  return async dispatch => {
    try {
      const response = await apiArticle.onLoadFeedArticleList(page);
      if(response.data){
        return {status: 'success', articles : response.data.articles, articlesCount : response.data.articlesCount };
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
  };
}

export const onChangeFavoriteArticle = async (slug, favorited) => {
    try {
      const response = await apiArticle.onChangeFavoriteArticle(slug, favorited);
      if(response.data){
        return {status: 'success', article : response.data.article};
      }
    } catch (error) {
      return { status: "error", errors: error.response.data.errors };
    }
}