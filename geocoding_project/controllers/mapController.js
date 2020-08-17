const key = require('../config/key');
const naver = require('../config/naver');

const rp = require('request-promise');
const bodyParser = require('body-parser');

const map = {
    getGoogleLatLong: async (req, res) => {
        // 404 에러 뜬다~~ 다시 해보자~~~~ 0817

        // 참고 https://developers.google.com/maps/documentation/geocoding/get-api-key
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?
            address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&
            key=${key.api_key}`;
        
        console.log('geocodeUrl: ', geocodeUrl);
        return res.redirect(geocodeUrl);
    },
    getNaverLatLong: async (req, res) => {
        // 참고 https://apidocs.ncloud.com/ko/ai-naver/maps_geocoding/geocode/
        
        // curl https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=%EB%B6%88%EC%A0%95%EB%A1%9C%206 -H "X-NCP-APIGW-API-KEY-ID:아이디" -H "X-NCP-APIGW-API-KEY:시크릿키" -v
        // const geocodeUrl = ``;
        const {address} = req.body;
        console.log(encodeURIComponent(address));
        // var latLong = bodyParser.urlencoded({extended: false});
        const geocode = {
            uri: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode/query=${encodeURIComponent(address)}`,
            method: 'POST',
            form: {
                address: address
            },
            headers: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'X-NCP-APIGW-API-KEY-ID': naver.client_id,
                'X-NCP-APIGW-API-KEY': naver.client_secret
            },
            json: true
        }

        // 08.18 오전 03시... 뭐가 문제인지 모르겠다~~
        // content-type urlencoded 로 꼭 해주기~~ 안될수도있음..

        // npm request-promise 사용
        const cb = await rp(geocode);

        console.log('cb', cb);
        
        return res.redirect('/');
    }
}

module.exports = map;