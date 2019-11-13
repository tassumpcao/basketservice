/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const pino = require('pino');
const priceClient = require('../clients/price');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

/**
 * This is the module responsible to handle all business logic of basket creation.
 *
 */
module.exports = () => {
  
  /**
 * This is a function responsible to group by items with the same name.
 *
 * @param {object} items - order object
 * @return {object} groupByArray - groupby array
 *
 */
  const groupBy = async (items) => {
    const groupByArray = await items.reduce((prev, item) => { 
      if ( item in prev ) prev[item] ++; 
      else prev[item] = 1; 
      return prev; 
    }, {} );
    return groupByArray;
  };

  /**
 * This is a function responsible to create a basket.
 *
 * @param {object} order - order object
 * @return {object} basket - basket
 *
 */
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
