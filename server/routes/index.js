const express = require('express');
const router = express.Router();
const supportLangs = require("../../web/data/supportLang.js");

router.get('/', function (req, res, next) {
  res.redirect('/article');
});
router.get("/article", function (req, res, next){
  res.view('pc/article', {}, ['article', 'account["Sign out"]']);
})
router.get('/account/login', function (req, res, next) {
  // 如果已经登录，则直接跳转到dashboard
  if(req.cookies.tk){
    return res.redirect('/');
  }
  res.view('pc/login', { supportLangs: supportLangs });
});
module.exports = router;
