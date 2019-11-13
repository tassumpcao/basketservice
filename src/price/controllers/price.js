/* eslint-disable object-shorthand */
const errors = require('errors');
const pino = require('pino');
const basketService = require('../services/basket');
const promotionService = require('../services/promotion');
const currencyService = require('../services/currency');

const commonError = require('../common/error');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

module.exports = () => {
  
  // validate request
  const validaRequest = (items) => {
    return new Promise((resolve, reject) => {
      if (items) resolve();
      else {
        reject(new errors.Http400Error({
          message: 'Missing mandatory parameters: [ items ]'
        }));
      }
    });
  };

  const calculatePriceForBasket = (req, res) => {
    
    const { items, currency } = req.body;
    return validaRequest(items)
      .then(async () => {
        
        const basket = await basketService().create(items);
        logger.debug(`priceController.calculatePriceForBasket - basket generated successfully: ${basket}`);
        const order = await promotionService().applyDiscount(basket);
        logger.debug(`priceController.calculatePriceForBasket - promotion applied successfully: ${order}`);
        const finalOrder = await currencyService().convert(order, currency);
        logger.debug(`priceController.calculatePriceForBasket - order converted successfully: ${finalOrder}`);
        res.status(200).json({
          subtotal: finalOrder.subtotal.toFixed(2),
          discountAmt: finalOrder.discountAmt.toFixed(2),
          discounts: finalOrder.discounts,
          total: finalOrder.orderTotal.toFixed(2),
          currency: currency
        }).send();
      }).catch((error) => {
        logger.error(error);
        commonError().handleError(error, res);
      });
  };


  return { calculatePriceForBasket };
};
