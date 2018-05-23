import axios from "../axios/";

export const apiAuth = {
  onLogin: user => axios.post("/users/login", user),
  onRegister: user => axios.post("/users", user),
  onUpdateUser: user => axios.put("/user", user),
};

export const appCommon = {
  onLoadApp: () => axios.get("/user")
};
