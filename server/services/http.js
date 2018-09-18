const https = require("https");
const http = require("http");
function httpGet(res, opts,callback) {
  let options = {
    hostname:opts.hostname.replace(/^\/\//,""),
    path:opts.path,
    method:"GET",
    headers:{
      "Client-Lang":opts.lang,
    }
  }
  return new Promise(function(resolve,rej){
    let req = http.request(options,(resp) => {
      let rawData = "";
      resp.setEncoding("utf-8");
      resp.on("data", (chunk) => {
        rawData += chunk;
      });
      resp.on("end", () => {
        try {
          resolve(rawData);
        } catch (e) {
          rej(rawData);
        }
      })
    }).on("error", (e) => {
      rej(e);
    });
    req.end();
  });
}
function httpsGet(res, opts,callback) {
  let options = {
    hostname:opts.hostname.replace(/^\/\//,""),
    path:opts.path,
    method:"GET",
    headers:{
      "Client-Lang":opts.lang,
    }
  }
  return new Promise(function(resolve,rej){
    let req = https.request(options,(resp) => {
      let rawData = "";
      resp.setEncoding("utf-8");
      resp.on("data", (chunk) => {
        rawData += chunk;
      });
      resp.on("end", () => {
        try {
          resolve(rawData);
        } catch (e) {
          rej(rawData);
        }
      })
    }).on("error", (e) => {
      rej(e);
    });
    req.end();
  });
}

// export const doGetRequest = (res,opts,callback) => {
function doGetRequest(res,opts,callback) {
  if(opts.protocol=="http"){
    httpGet(res,{
      hostname:opts.hostname,
      path:opts.url,
      lang:opts.lang
    }).then(function(resp){
      return callback(resp);
    });
  }else{
    httpsGet(res,{
      hostname:opts.hostname,
      path:opts.url,
      lang:opts.lang
    }).then(function(resp){
      return callback(resp);
    });
  }
}
module.exports = {
  doGetRequest,
}
