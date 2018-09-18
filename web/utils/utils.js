/**
 * Created by Xuzhe on 2016/12/8.
 */
import _ from 'lodash';

function getType(o) {
  var _t;
  return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}

function listen(event, fn) {
  addEventListener(event, fn, false);
  return function () {
    removeEventListener(event, fn, false);
  }
}

function timeMillseconds() {
  return Date.now().valueOf();
}


function validateId(cardString) {

  function GetVCode(CardNo17) {
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var Ai = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var cardNoSum = 0;
    for (var i = 0; i < CardNo17.length; i++)
      cardNoSum += CardNo17.charAt(i) * Wi[i];
    var seq = cardNoSum % 11;
    return Ai[seq];
  }

  function IsDate(strDate) {
    var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[2] - 1, r[3]);
    return d.getFullYear() === r[1] / 1 && d.getMonth() + 1 === r[2] / 1 && d.getDate() === r[3] / 1;
  }

  cardString = cardString.replace(' ', '');

  var strCardNo;
  if (cardString.length === 18) {
    var pattern = /^\d{17}(\d|x|X)$/;
    if (pattern.exec(cardString) == null)
      return false;
    strCardNo = cardString.toUpperCase();
  } else {
    if (/^\d{15}$/.exec(cardString) == null)
      return false
    strCardNo = cardString.substr(0, 6) + '19' + cardString.substr(6, 9);
    strCardNo += GetVCode(strCardNo);
  }

  if (strCardNo.length != 18)
    return false;

  if (GetVCode(strCardNo.substr(0, 17)) != strCardNo.charAt(17)) {
    return false;
  }

  if (!IsDate(strCardNo.substr(6, 8))) {
    return false;
  }

  var prov = parseInt(strCardNo.substr(0, 2));
  const available =
  {
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    21: 1,
    22: 1,
    23: 1,
    31: 1,
    32: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    41: 1,
    42: 1,
    43: 1,
    44: 1,
    45: 1,
    46: 1,
    50: 1,
    51: 1,
    52: 1,
    53: 1,
    54: 1,
    61: 1,
    62: 1,
    63: 1,
    64: 1,
    65: 1,
    71: 1,
    81: 1,
    82: 1,
    91: 1
  };
  if (!available.hasOwnProperty(prov)) {
    return false;
  }
  return true;
}

function makeValidator(obj) {
  let validators = {
    errors: {},
    init: {},
    handlers: {}
  }
  _.each(obj, (handler, k)=>{
    validators.errors[k] = '';
    validators.init[k] = false;
    validators.handlers[k] = handler;
  })
  return validators;
}

function getPrecision(f) {
  const strs = f.toString().split(".")[1];
  if (!strs) {
    return 0;
  }
  return strs.length;
}

function formatSize(a,b,c,d,e) {
  return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
    +' '+(e?'KMGTPEZY'[--e]+'B':'Bytes')
}

function onDetailLoadCompleted(count) {
  let even = false;
  if (count > 0) {
    even = count % 2 == 0;
  }
  return even;
};

function formatPhone(phone) {
  if(!phone) {
    return "";
  }
  phone = phone.toString();
  let len = phone.length;
  return phone.slice(0, len-8) + _.repeat('*', 4) + phone.slice(len-4);
};

function formatEmail(email){
  if(!email) {
    return "";
  }
  email = email.toString();
  let str = email.match(/(.*)\@/)[1];
  const len = str.length;
  return str.slice(0,2)+ _.repeat('*',len-2) + email.match(/\@(.*)/)[0];
}

function formatBankNumber(num){
  let len = num&&num.length;
  if(num && len>0) {
    return num.slice(0, 4) + " **** **** " + num.slice(num.length-5, num.length-1);
  }
  return "";
}

function getUrlParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}

export default {
  getType,
  listen,
  validateId,
  timeMillseconds,
  getPrecision,
  formatSize,
  onDetailLoadCompleted,
  formatPhone,
  formatEmail,
  formatBankNumber,
  getUrlParams,
};
