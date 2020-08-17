const key = require('../config/key');
const { urlencoded } = require('express');

const map = {
    getGoogleLatLong: async (req, res) => {
        // 404 에러 뜬다~~ 다시 해보자~~~~ 0817
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?
            address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&
            key=${key.api_key}`;
        
        console.log('geocodeUrl: ', geocodeUrl);
        return res.redirect(geocodeUrl);
    },
    getNaverLatLong: async (req, res) => {
        const address = urlencoded('서울시');
        const geocodeUrl = urlencoded(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode/query=양천로 714-18`);

        console.log('geocodeUrl:', geocodeUrl);
        return res.redirect(geocodeUrl);
    }
}

module.exports = map;