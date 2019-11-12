/* eslint-disable object-shorthand */
const errors = require('errors');

const basketService = require('../services/basket');
const promotionService = require('../services/promotion');
const currencyService = require('../services/currency');

const commonError = require('../common/error');

module.exports = () => {
  
  // validate request
  const validaRequest = (items) => {
    return new Promise((resolve, reject) => {
      if (items) resolve();
      else reject(new errors.Http400Error({
        message: 'Missing mandatory parameters: [ items ]'
      }));
    });
  };

  const calculatePriceForBasket = (req, res) => {
    
    const { items, currency } = req.body;
    return validaRequest(items)
      .then(async () => {
        
        const basket = await basketService().create(items);
        
        const order = await promotionService().applyDiscount(basket);
        
        const finalOrder = await currencyService().convert(order, currency);

        res.status(200).json({
          subtotal: finalOrder.subtotal.toFixed(2),
          discountAmt: finalOrder.discountAmt.toFixed(2),
          discounts: finalOrder.discounts,
          total: finalOrder.orderTotal.toFixed(2),
          currency: currency
        }).send();
      }).catch((error) => {
        commonError().handleError(error, res);
      });
  };


  return { calculatePriceForBasket };
};
