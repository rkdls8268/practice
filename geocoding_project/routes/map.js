var express = require('express');
var router = express.Router();

const MapController = require('../controllers/mapController');

// google geocoding api는 유료임. 결제해야함..!
router.get('/google', MapController.getGoogleLatLong);
router.post('/naver', MapController.getNaverLatLong);

module.exports = router;