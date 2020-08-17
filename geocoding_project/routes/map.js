const express = require('express');
const router = express.Router();

const MapController = require('../controllers/mapController');

// google geocoding api는 유료임. 결제해야함..!
router.get('/google', MapController.getGoogleLatLong);
router.get('/naver', MapController.getNaverLatLong);

module.exports = router;