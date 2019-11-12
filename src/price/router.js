const express = require('express');
const priceController = require('./controllers/price');


module.exports = () => {
  const router = express.Router();
  
  router.post('/price', priceController().calculatePriceForBasket);
  
  return { router };
};
