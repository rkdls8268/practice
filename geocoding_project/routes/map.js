const express = require('express');
const router = express.Router();

const MapController = require('../controllers/mapController');

router.get('/geocoding', MapController.getLatLong);

module.exports = router;