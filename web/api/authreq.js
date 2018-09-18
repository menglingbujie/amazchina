/**
 * Created by MengLJ on 2017/2/16.
 */
import http from 'axios';
import Cookie from "js-cookie";
export default {
  request(method, url, data, options) {
    const tk = Cookie.get("tk"), lang = Cookie.get("lang");
    let params = _.assign({}, {
      method: method,
      url: url,
      data: data || {},
      headers: {
        Authorization: "Bearer " + tk,
        "CLIENT-LANG": lang,
      }
    }, options);
    return http(params).then(data => {
      return data.data;
    }).then((data) => {
      if (data.result) {
        return data;
      }
      return data;
    }).catch((e) => {
      return e;
    });
  }
};
