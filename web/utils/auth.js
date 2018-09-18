import Cookies from 'js-cookie'

const TokenKey = 'access_token';
// 过期时间 30 分钟；
const in30Minutes = 1/48;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: in30Minutes, path: '/'});
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
