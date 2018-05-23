import { APP_LOAD } from '../constants/actionType';
import axios from '../axios/';
import { appCommon } from '../api/'
export const onLoadApp =  (user = localStorage.getItem("token") ,token = localStorage.getItem("token")) => {
  return async dispatch => {
    if(!user){
     dispatch({ type : APP_LOAD, user: null, token});
     return '';
    }
    try {
     const response = await axios.get("/user");
     if(response.data){
      dispatch({ type : APP_LOAD, user: response.data.user, token});
      return response.data;
     }
    } catch (error) {
      return "Đã có lỗi";
    }
  }
};