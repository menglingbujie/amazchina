/* by menglj at 20170321 */
module.exports = function(req){
  const ua = req.headers['user-agent'];
  const _urlPath = req.path.replace(/\/$/,"");
  let _$adapter={
    Mobile: false,
    iPhone:false,
    iPad: false,
    PC: false,
    Android:false,
    Other: false,
    isMobile:false,
    url:"",
    isWeixin:false,
    isInApp:false,
  };
  // 检测是否在app内部打开
  _$adapter.isInApp = /ubfx/g.test(ua)?true:false;

  if(/MicroMessenger/i.test(ua)){
    _$adapter.isWeixin=true;
  }
  if(/mobile/i.test(ua)){
    _$adapter.Mobile = true;
  }
  if(/iPhone/.test(ua)){
    _$adapter.iPhone = true;
  }else if(/iPad/.test(ua)){
    _$adapter.iPad = true;
  }else if(/Android/.test(ua)){
    _$adapter.Android = true;
  }else{
    _$adapter.PC = true;
  }
  _$adapter.isMobile = _$adapter.PC?false:true;

  if(_urlPath.match(/^\/(api|i18n|socket.io\/*)$/)){
    return _$adapter;
  }
  const _urlMap = {
    "mobile":{
      "/index":"/mobile",
      "/web/news/events":"/mobile/news",
      "/web/news/calendar":"/mobile/calendar",
      "/web/trade/introduce/account_type":"/mobile/account_type",
      "/web/about/company":"/mobile/company",
      "/web/about/advantages":"/mobile/advantage",
      "/space":"/mobile/center#/",

    },
    "pc":{
      "/mobile":"/index",
      "/mobile/news":"/web/news/events",
      "/mobile/calendar":"/web/news/calendar",
      "/mobile/account_type":"/web/trade/introduce/account_type",
      "/mobile/company":"/web/about/company",
      "/mobile/advantage":"/web/about/advantages",
      "/mobile/center#/":"/space",
    }
  }
  // 只有mobile下才会有跳转url
  let pt = _$adapter.isMobile?"mobile":"pc";
  if(!req.cookies.switch_platform){
    pt = "mobile";
  }
  const _path = _urlMap[pt][_urlPath];
  if(_path){
    _$adapter.url=_path;
  }
  return _$adapter;
};
