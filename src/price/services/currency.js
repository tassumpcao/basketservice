/* eslint-disable object-shorthand */
const errors = require('errors');
const currencyClient = require('../clients/currency');

module.exports = () => {
  
  const convert = (order, currency) => {
    
    const rate = currencyClient().getRateForCurrency(currency);
    if (!rate){
      throw new errors.Http422Error(`Rate not found for currency: ${currency}`);
    }
    
    const convertedOrder = {
      subtotal: order.subtotal * rate, 
      discounts: order.discounts,
      discountAmt: order.discountAmt * rate,
      orderTotal: order.orderTotal * rate,
      currency: currency
    };
    return convertedOrder;
  };
  
  return { convert };
};
