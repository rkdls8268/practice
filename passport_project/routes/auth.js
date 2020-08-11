const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * localhost:3000/auth/login
 * local strategy을 사용해서 로그인 시도
 * local strategy? 로그인을 하는 로직이 담겨있는 전략법~
 * 로그인 성공 시 redirect : 'localhost:3000/'
 * 로그인 실패 시 redirect : 'localhost:3000/auth/login'
 */

 router.post('/login', passport.authenticate('local', {
     successRedirect: '/auth',
     failureRedirect: 'auth/login',
     failureFlash: false // 로그인에 성공하거나 실패했을 때 해당하는 메시지가 나오게끔 만듦
 }));

 module.exports = router;