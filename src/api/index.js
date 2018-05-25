import axios from "../axios/";

export const apiAuth = {
  onLogin: user => axios.post("/users/login", user),
  onRegister: user => axios.post("/users", user),
  onUpdateUser: user => axios.put("/user", user),
  onGetUserProfile: username => axios.get(`/profiles/${username}`),
  onChangeFollowUser: (username, following) => following 
                                                ? axios.delete(`/profiles/${username}/follow`) 
                                                : axios.post(`/profiles/${username}/follow`), 
};

export const appCommon = {
  onLoadApp: () => axios.get("/user")
};

export const apiArticle = {
  onCreateArticle: article => axios.post("/articles", { article }),
  onUpdateArticle: (slug, article) => axios.put("/articles/" + slug, { article }),
  onLoadArticle : (slug) => axios.get('/articles/' + slug),
  onDeleteArticle : (slug) => axios.delete('/articles/' + slug),
  onLoadArticleList : (page = 0) => axios.get(`/articles/?limit=10&offset=${page*10}`),
  onLoadArticleListByTag : (page = 0,tag) => axios.get(`/articles/?limit=10&offset=${page*10}&tag=${tag}`),
  onLoadArticleListByAuthor : (page = 0,auth) => axios.get(`/articles/?limit=10&offset=${page*10}&author=${auth}`),
  onLoadFavoriteArticleListByUser : (page = 0,auth) => axios.get(`/articles/?limit=10&offset=${page*10}&favorited=${auth}`),
  onLoadFeedArticleList : (page = 0) => axios.get(`/articles/feed?limit=10&offset=${page*10}`),
  onChangeFavoriteArticle: (slug, favorited) => favorited 
                                                ? axios.delete(`/articles/${slug}/favorite`) 
                                                : axios.post(`/articles/${slug}/favorite`), 
  onGetCommentsArticle : (slug) => axios.get(`/articles/${slug}/comments`),
  onAddCommentArticle : (slug, comment) => axios.post(`/articles/${slug}/comments`, comment),
  onDeleteCommentArticle : (slug,id) => axios.delete(`/articles/${slug}/comments/${id}`),
                                                
};
export const apiTags = {
  onLoadAllTags: () => axios.get('/tags')
};
