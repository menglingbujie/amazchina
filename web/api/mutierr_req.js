/**
 * Created by MengLJ on 2017/2/16.
 */
import http from 'axios';
import Cookie from "js-cookie";
export default {
  request(method, url, data, options) {
    let params = _.assign({}, {
      method: method,
      url: url,
      data: data||{},
      headers: {
        "CLIENT-LANG": Cookie.get("lang"),
      }
    }, options);

    http(params).then(data => {
      if (data.result) {
        return data;
      }
      if (data.data.errors) {
        return data.data.errors;
      } else {
        return data;
      }
    }).catch((e) => {
      return e;
    });a
  }
};
