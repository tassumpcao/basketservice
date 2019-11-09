const express = require('express');
const priceController = require('./controllers/price');

const router = express.Router();

router.post('/price', priceController);

exports.module = router;
