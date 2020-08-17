const key = require('../config/key');

const map = {
    getLatLong: async (req, res) => {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?
            address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&
            key=${key.api_key}`;
        
        console.log('geocodeUrl: ', geocodeUrl);
        return res.redirect(geocodeUrl);
    }
}

module.exports = map;