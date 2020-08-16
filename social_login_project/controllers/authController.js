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

const {OAuth2Client, GoogleAuth} = require('google-auth-library');

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
    gmailLogin: async (req, res) => {
        // const client = new OAuth2Client(gmail.clientID);
        // async function verify() {
        //     const ticket = await client.verifyIdToken({
        //         idToken: token,
        //         audience: kakao.clientID
        //     });
        //     const payload = ticket.getPayload();
        //     const userid = payload['sub'];
        // }

        // verify().catch(console.error);
        // gmailAuthUrl이 제대로 동작하지 않는듯... 다시 해보자~
        const gmailAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
            scope=https://www.googleapis.com/auth/userinfo.email
            &access_type=offline
            &include_granted_scopes=true
            &state=state_parameter_passthrough_value
            &response_type=code
            &client_id=${gmail.clientID}
            &redirect_uri=${gmail.redirectURI}`;
        
        // access_type=offline 의미
        // 사용자가 browser에 없어도 refresh token 발급 받을 수 있는지 없는지를 설정
        
        console.log('gmailAuthUrl: ', gmailAuthUrl);
        return res.redirect(gmailAuthUrl);
    },
    gmailCallback: async (req, res) => {
        const { code } = req.query;
        console.log('code: ', code);

        const options = {
            uri: 'https://oauth2.googleapis.com/token',
            method: 'POST',
            form: {
                grant_type: "authorization_code",
                client_id: gmail.clientID,
                client_secret: gmail.clientSecret,
                redirect_uri: gmail.redirectURI,
                code: code,
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
        const id_token = cb.id_token;
        console.log('access_token: ', access_token);

        // 무슨 문제인지 알겠다..!!!
        // drive 관련 api 를 받아야 userResponose 가 실행이 될듯~~

        // 참고: https://developers.google.com/identity/sign-in/web/backend-auth


        // id_token 값 확인해주는 것 같다... verify()
        const client = new OAuth2Client(gmail.clientID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: gmail.clientID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        }

        verify().catch(console.error);

        const userResponse = {
            // ** userinfo 엔드포인트는 더 이상 사용하지 않는다고 한다.
            // uri: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            uri: `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            json: true
        }
        // 결과엔 이메일은 안 뜨는데 어떻게 받아올 수 있을까~?
        // Google API의 범위에 email, profile, openid 셋 다 있음. 
        // 원래 기본적으로는 앱을 등록하면 제공하는데 지금 앱으로 등록이 안되어있어서 안되는것 같다,,
        // +) 추가적으로 해결 완료, gmailLogin url scope에는 email
        //    postman 인증할 때 scope 에는 profile 넣었더니 추가되어서 해결된듯.. 일시적일듯 싶음.
        const ur = await rp(userResponse);

        const data = {
            email: ur.email,
            name: ur.name,
            imgurl: ur.picture,
            given_name: ur.given_name,
            family_name: ur.family_name
        }

        console.log('userResponse', data);

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