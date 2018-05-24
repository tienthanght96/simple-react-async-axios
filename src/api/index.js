import axios from "../axios/";

export const apiAuth = {
  onLogin: user => axios.post("/users/login", user),
  onRegister: user => axios.post("/users", user),
  onUpdateUser: user => axios.put("/user", user)
};

export const appCommon = {
  onLoadApp: () => axios.get("/user")
};

export const apiArticle = {
  onCreateArticle: article => axios.post("/articles", { article }),
  onUpdateArticle: (slug, article) => axios.put("/articles/" + slug, { article }),
  onLoadArticle : (slug) => axios.get('/articles/' + slug),
  onLoadArticleList : (page = 0) => axios.get(`/articles/?limit=10&offset=${page*10}`),
  onLoadArticleListByTag : (page = 0,tag) => axios.get(`/articles/?limit=10&offset=${page*10}&tag=${tag}`),
  onLoadArticleListByAuthor : (page = 0,auth) => axios.get(`/articles/?limit=10&offset=${page*10}&author=${tag}`),
  onLoadFavoriteArticleListByUser : (page = 0,favorited) => axios.get(`/articles/?limit=10&offset=${page*10}&favorited=${favorited}`),
  onLoadFeedArticleList : (page = 0) => axios.get(`/articles/feed?limit=10&offset=${page*10}`),
};
export const apiTags = {
  onLoadAllTags: () => axios.get('/tags')
};
