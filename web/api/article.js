
/**
 * Created by menglj on 2018-06-08.
 */
import authReq from './authreq';

const apiurl = window.AmazChina.initalState.api_url;

export default {
  // 文章列表
  getAllArticleList(){
    return authReq.request('get', `${apiurl}/article/list`)
  },
  // 创建文章
  createArticle(form) {
    return authReq.request('post', `${apiurl}/article/create`,form)
  },
};
