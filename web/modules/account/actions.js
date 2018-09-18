
import accountApi from '@/api/account';
import Cookie from "js-cookie";
export const doLogout = (context) =>{
  return accountApi.doLogout().then((resp) => {
    if (resp.result) {
      Cookie.remove("tk");
      setTimeout(function(){location.replace('/account/login');},3e2);
    } else {
      throw(resp.message);
    }
  });
}