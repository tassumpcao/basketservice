/* eslint-disable no-useless-catch */
const pino = require('pino');
const priceClient = require('../clients/price');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
module.exports = () => {

  const groupBy = async (items) => {
    const groupByArray = await items.reduce((prev, item) => { 
      if ( item in prev ) prev[item] ++; 
      else prev[item] = 1; 
      return prev; 
    }, {} );
    return groupByArray;
  };

  const create = async (items) => {
    const basket = {
      items: []
    };
 
    const productsQty = await groupBy(items);
    logger.debug(`basketService.create - products groupBy successfully: ${productsQty}`);
    const dctProduction = [...new Set(items)];
    dctProduction.forEach((product) => {
      const price = priceClient().getPricesByName(product);
      basket.items.push({
        name: product,
        unitPrice: price,
        quantity: productsQty[product]
      });  
    });
    logger.debug(`basketService.create - basket generated successfully: ${basket}`);
    return basket;
  };
  
  return { create };
};
