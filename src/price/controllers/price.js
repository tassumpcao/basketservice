const errors = require('errors');

const basketService = require('../services/basket');
const promotionService = require('../services/promotion');
const currencyService = require('../services/currency');

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

  const calculatePriceForBasket = (req, res, next) => {
    const { items, currency } = req.body;
    return validaRequest(items)
      .then(async () => {
        try {
          const basket = await basketService.create(items);
          
          const order = await promotionService.applyDiscount(basket);
          
          const finalOrder = await currencyService.convert(order, currency);
          
          res.status(200).json({
            subtotal: finalOrder.subtotal,
            discounts: finalOrder.discounts,
            total: finalOrder.total,
            currency: finalOrder.currency
          });
        } catch (error) {
          if (next) next(error);
          else throw error;
        }
      }).catch(
        (error) => { 
          if (next) next(error);
          else throw error; });
    
    // calculate discount
    // calculate totals
    // convert to currency
  };


  return { calculatePriceForBasket };
}