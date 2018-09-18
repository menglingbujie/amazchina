
import articleApi from '@/api/article';

export const getAllArticleList = (context) => {
  return articleApi.getAllArticleList().then((resp) => {
    if (resp.result) {
      return resp.data;
    } else {
      throw (resp.message);
    }
  });
}
export const createArticle = (context, form) => {
  return articleApi.createArticle(form).then((resp) => {
    if (resp.result) {
      return resp.data;
    } else {
      throw(resp.message);
    }
  });
}
