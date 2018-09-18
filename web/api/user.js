
/**
 * Created by menglj on 2018-06-08.
 */
import authReq from '@/api/authreq';

const apiurl = window.AmazChina.initalState.api_url;
export default {
  // 获取用户信息
  fetchUserInfo() {
    return authReq.request('get',`${apiurl}/user/info`);
  },
};
