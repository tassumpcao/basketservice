const pino = require('pino');
const promotions = require('../../../src/price/clients/fixtures/promotions');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

/**
 * This is the module responsible to handle the access to the promotion data
 *
 */
module.exports = () => {
  
  /**
 * This is a function responsible to determine the promotion based on the priority
 *
 * @param {object} originalPromo - promotion
 * @param {object} newPromo - promotion
 * @return {object} promotion
 *
 */
  const applyPriority = (originalPromo, newPromo) => {
    if ((originalPromo) && ( originalPromo.priority < newPromo.priority ))
      return originalPromo;
    return newPromo;
  };

  /**
 * This is a function responsible to retrieve the promotion data for a product
 *
 * @param {object} item - item
 * @return {object} promotion
 *
 */
  const getPromoForProduct = (item) => {
    let promo;
    promotions.forEach((promotion) => {
      if ((promotion.productName === item.name) 
        && (item.quantity >= promotion.minimalQty))
      {
        promo = applyPriority(promo, promotion);
      }
    });
    logger.debug(`promotionClient.getPromoForProduct - promotions set successfully: ${promo}`);
    return promo;
  };
  return { getPromoForProduct };
};
