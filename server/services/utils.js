/**
 * Created by Xuzhe on 2016/12/8.
 */

function getType(o) {
  var _t;
  return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}

function isEnvProduct() {
  return process.env.PRODUCT_ENV == 'product';
}

function getCdnServer(lang) {
  const cdnKey = 'CDN_SERVER_' + lang;
  if (process.env.hasOwnProperty(cdnKey)) {
    return process.env[cdnKey];
  } else if (process.env.hasOwnProperty('CDN_SERVER_DEFAULT')) {
    return process.env['CDN_SERVER_DEFAULT']
  } else {
    return '/dist/'
  }
}

function normalizeCros(url, host) {
  // return url.replace(/\{host\}/ig, host.split('.').slice(-2).join('.'));
  return url.replace(/\{host\}/ig, host.replace(/.*?\.(.*)/,"$1"));
}

function getHostnameByUrl(url){
  return url.replace(/.*\/{2}(.*)/, "$1").replace(/\/.*/, "");
}


module.exports = {
  getType,
  isEnvProduct,
  getCdnServer,
  normalizeCros,
  getHostnameByUrl
};
