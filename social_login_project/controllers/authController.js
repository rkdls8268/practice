/**
 * kakao
 * https://devhaks.github.io/2019/05/31/oauth2/ 참고
 * https://blog.naver.com/PostView.nhn?blogId=psj9102&logNo=221326329058&categoryNo=40&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView 참고
 */

const kakao = require('../config/kakao');
const apple = require('../config/apple');
const gmail = require('../config/gmail');
// const axios = require('axios');
// const request = require('request');
const rp = require('request-promise');

const {OAuth2Client} = require('google-auth-library');

const auth = {
    kakaoLogin: async (req, res) => {
        const callbackUrl = 'https://www.getpostman.com/oauth2/callback';
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
            kakao.clientID
            }&redirect_uri=${
            kakao.redirectURI
            }&response_type=code`;
        
        console.log('kakaoAuthUrl: ', kakaoAuthUrl);
        return res.redirect(kakaoAuthUrl);
    },
    kakaoCallback: async (req, res) => {
        // console.log('req.query', req);
        // code 값 받아오는 것부터 잘못된 것 같다,,, 내일 다시 해보자 * 08/13 04:34
        const { code } = req.query;
        console.log('code: ', code);

        const options = {
            uri: 'https://kauth.kakao.com/oauth/token',
            method: 'POST',
            form: {
                grant_type: "authorization_code",
                client_id: kakao.clientID,
                client_secret: kakao.clientSecret,
                redirect_uri: kakao.redirectURI,
                code: code
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            json: true
        }

        // npm request-promise 사용
        const cb = await rp(options);

        console.log('cb', cb);
        // cb 에 있는 정보들 db에 저장하는 model 하나 만들어 주면 될듯~~

        const access_token = cb.access_token;

        const userResponse = {
            uri: 'https://kapi.kakao.com/v2/user/me',
            method: 'GET',
            // form: {
            //     grant_type: "authorization_code",
            //     client_id: kakao.clientID,
            //     client_secret: kakao.clientSecret,
            //     redirect_uri: kakao.redirectURI,
            //     code: code
            // },
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            json: true
        }

        const ur = await rp(userResponse);

        console.log('userResponse', ur);

        return res.redirect('/');
    },
    appleLogin: async (req, res) => {
        const appleAuthUrl = `https://appleid.apple.com/auth/authorize? 
            response_type=code%20id_token
            &client_id=${apple.clientID}
            &redirect_uri=${apple.redirectURI}
            &state=${apple.state}
            &scope=${apple.scope}
            &response_mode=form_post`;
        
        console.log('appleAuthUrl: ', appleAuthUrl);
        return res.redirect(appleAuthUrl);
    },
    appleCallback: async (req, res) => {
        const { code } = req.query;
        console.log('code: ', code);

        const options = {
            uri: 'https://appleid.apple.com/auth/token',
            method: 'POST',
            form: {
                grant_type: "authorization_code",
                client_id: apple.clientID,
                client_secret: apple.clientSecret,
                redirect_uri: apple.redirectURI,
                code: code
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            json: true
        }

        // npm request-promise 사용
        const cb = await rp(options);

        console.log('cb', cb);
        // cb 에 있는 정보들 db에 저장하는 model 하나 만들어 주면 될듯~~

        const access_token = cb.access_token;

        // const userResponse = {
        //     uri: 'https://kapi.kakao.com/v2/user/me',
        //     method: 'GET',
        //     // form: {
        //     //     grant_type: "authorization_code",
        //     //     client_id: kakao.clientID,
        //     //     client_secret: kakao.clientSecret,
        //     //     redirect_uri: kakao.redirectURI,
        //     //     code: code
        //     // },
        //     headers: {
        //         Authorization: `Bearer ${access_token}`
        //     },
        //     json: true
        // }

        // const ur = await rp(userResponse);

        // console.log('userResponse', ur);

        return res.redirect('/');
    },
    gmailLogain: async (req, res) => {
        const client = new OAuth2Client(gmail.clientID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: kakao.clientID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        }

        verify().catch(console.error);
        // const gmailAuthUrl = `https://appleid.apple.com/auth/authorize? 
        //     response_type=code%20id_token
        //     &client_id=${apple.clientID}
        //     &redirect_uri=${apple.redirectURI}
        //     &state=${apple.state}
        //     &scope=${apple.scope}
        //     &response_mode=form_post`;
        
        // console.log('gmailAuthUrl: ', gmailAuthUrl);
        // return res.redirect(gmailAuthUrl);
    },
    gmailCallback: async (req, res) => {
        const { code } = req.query;
        console.log('code: ', code);

        const options = {
            uri: 'https://kauth.kakao.com/oauth/token',
            method: 'POST',
            form: {
                grant_type: "authorization_code",
                client_id: kakao.clientID,
                client_secret: kakao.clientSecret,
                redirect_uri: kakao.redirectURI,
                code: code
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            json: true
        }

        // npm request-promise 사용
        const cb = await rp(options);

        console.log('cb', cb);
        // cb 에 있는 정보들 db에 저장하는 model 하나 만들어 주면 될듯~~

        const access_token = cb.access_token;

        const userResponse = {
            uri: 'https://kapi.kakao.com/v2/user/me',
            method: 'GET',
            // form: {
            //     grant_type: "authorization_code",
            //     client_id: kakao.clientID,
            //     client_secret: kakao.clientSecret,
            //     redirect_uri: kakao.redirectURI,
            //     code: code
            // },
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            json: true
        }

        const ur = await rp(userResponse);

        console.log('userResponse', ur);

        return res.redirect('/');
    }
};

/**
 * Get profile information
 * function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
 */

module.exports = auth;