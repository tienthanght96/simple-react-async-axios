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
  onLoadArticle : (slug) => axios.get('/articles/' +slug)
};
