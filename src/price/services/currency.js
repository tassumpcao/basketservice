/* eslint-disable object-shorthand */
const pino = require('pino');
const errors = require('errors');
const currencyClient = require('../clients/currency');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

module.exports = () => {
  
  const convert = async (order, currency) => {
    
    const rate = await currencyClient().getRateForCurrency(currency);
    logger.debug(`currencyService.convert - rated set successfully: ${rate}`);
    if (!rate){
      logger.error(`Rate not found for currency: ${currency}`);
      throw new errors.Http422Error(`Rate not found for currency: ${currency}`);
    }
    
    const convertedOrder = {
      subtotal: order.subtotal * rate, 
      discounts: order.discounts,
      discountAmt: order.discountAmt * rate,
      orderTotal: order.orderTotal * rate,
      currency: currency
    };

    logger.debug(`currencyService.convert - order converted successfully: ${convertedOrder}`);
    
    return convertedOrder;
  };
  
  return { convert };
};
