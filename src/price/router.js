const express = require('express');
const priceController = require('./controllers/price');

/**
 * This is the module responsible to handle the /price route and point to the controller.
 *
 */
module.exports = () => {
  const router = express.Router();
  
  router.post('/price', priceController().calculatePriceForBasket);
  
  return { router };
};
