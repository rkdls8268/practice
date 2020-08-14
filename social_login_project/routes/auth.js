var express = require('express');
var router = express.Router();

const passport = require('passport');
const AuthController = require('../controllers/authController');

router.get('/kakao', AuthController.kakaoLogin);
router.get('/kakao/callback', AuthController.kakaoCallback);

router.get('/apple', AuthController.appleLogin);
router.get('/apple/callback', AuthController.appleCallback);

router.get('/google', AuthController.gmailLogin);
router.get('/google/callback', AuthController.gmailCallback);

// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));
// router.get('/google/callback', passport.authenticate('google', {
//     failureRedirect: '/login'
// }), function(req, res) {
//     res.redirect('/');
// });


module.exports = router;