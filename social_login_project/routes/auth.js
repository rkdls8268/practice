var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/authController');
// const kakao = require('../config/kakao');

router.get('/kakao', AuthController.kakaoLogin);
router.get('/kakao/callback', AuthController.kakaoCallback);

module.exports = router;