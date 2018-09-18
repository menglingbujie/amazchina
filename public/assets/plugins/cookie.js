const Cookie = {
  set: function(key, value, options){
    var exdate = new Date(), expire = options && options.expire || 30, path = options &&options.path||"/";
    exdate.setDate(exdate.getDate() + expire);
    document.cookie = key + "=" + escape(value) +
      ((expire == null) ? "" : ";path=" + path+";expires=" + exdate.toGMTString())
  },
  get: function(key){
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(key + "=")
      if (c_start != -1) {
        c_start = c_start + key.length + 1
        c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
  remove: function(key){
    this.set(key, "", -1);
  },
}