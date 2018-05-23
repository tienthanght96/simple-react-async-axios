import axios from "axios";

const instance = axios.create({
  baseURL: "https://conduit.productionready.io/api",
  timeout: 4000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=UTF-8"
  }
});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.timeout = 4000;

instance.interceptors.request.use(
  request => {
    const token = localStorage.getItem('token');
    request.headers.Authorization =  token ? `Token ${token}` : '';
    request.headers.crossDomain = true;
    return request;
  },
  error => {
    console.log("ERROR REQUEST GLOBAL", error);
    alert(error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("ERROR RESPONSE GLOBAL", error);
    alert(error);
    return Promise.reject(error);
  }
);
export default instance;
