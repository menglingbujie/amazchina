import * as types from './mtypes';
import userApi from '@/api/user';
import Cookie from "js-cookie";
export const gotoLogin = (context)=>{
  Cookie.remove("tk");
  return location.replace('/account/login');
}
export const fetchUserInfo = (context) =>{
  return userApi.fetchUserInfo().then((resp) => {
    if (resp.result) {
      context.commit(types.UPDATE_USER_INFO, resp.data);
      return resp.data;
    } else {
      return context.dispatch('gotoLogin');
    }
  });
}