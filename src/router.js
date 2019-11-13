const express  = require('express');
const priceRouter = require('./price/router');

const router = express.Router();

router.use('/checkout', priceRouter().router);
/**
 * This is the module responsible to handle the /checkout route.
 *
 */
module.exports = router;
