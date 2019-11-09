const express  = require('express');
const priceRouter = require('./price/router');

const router = express.Router();

router.use('/checkout', priceRouter);

module.exports = router;
