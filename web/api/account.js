/**
 * Created by Menglj on 2018-06-08
 */
import authReq from '@/api/authreq';

const apiurl = window.AmazChina.initalState.api_url;

export default {

  doLogout(){
    return authReq.request('get', `${apiurl}/user/logout`);
  },

};
