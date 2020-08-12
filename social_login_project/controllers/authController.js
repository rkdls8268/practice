const kakao = require('../config/kakao');
const axios = require('axios');
// const linkUser = require('../modules/linkUser');

// function linkUser(session, provider, authData) {
//     let result = false;
//     if (session.authData) {
//       if (session.authData[provider]) {
//         // 이미 계정에 provider 가 연결되어 있는 경우
//         return result;
//       }
  
//       session.authData[provider] = authData;
//     } else {
//       session.authData = {
//         [provider]: authData
//       };
//     }
  
//     result = true;
  
//     return result;
// }

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

        let tokenResponse;
        try {
            // Authorization Server 부터 Access token 발급받기
            // axios: HTTP 통신을 하는데 사용하는 js 라이브러리
            tokenResponse = await axios({
                method: "POST",
                url: 'https://kauth.kakao.com/oauth/token',
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    grant_type: "authorization_code",
                    client_id: kakao.clientID,
                    client_secret: kakao.clientSecret,
                    redirect_uri: kakao.redirectURI,
                    code: code
                })
            });
        } catch (error) {
            return res.json(error.data);
        }

        console.info("==== tokenResponse.data ====");
        console.log(tokenResponse.data);

        const { access_token } = tokenResponse.data;

        let userResponse;
        try {
            // access_token 으로 사용자 정보 요청하기
            userResponse = await axios({
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
        } catch (error) {
            return res.json(error.data);
        }

        console.info("==== userResponse.data ====");
        console.log(userResponse.data);

        // const authData = {
        //     ...tokenResponse.data,
        //     ...userResponse.data
        // };

        // const result = linkUser(session, "kakao", authData);

        // if (result) {
        //     console.info("계정에 연결되었습니다.");
        // } else {
        //     console.warn("이미 연결된 계정입니다.");
        // }

        res.redirect("/");
    }
};

module.exports = auth;