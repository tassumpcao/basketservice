const pino = require('pino');
const promotions = require('../../../src/price/clients/fixtures/promotions');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

module.exports = () => {

  const applyPriority = (originalPromo, newPromo) => {
    if ((originalPromo) && ( originalPromo.priority < newPromo.priority ))
      return originalPromo;
    return newPromo;
  };

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
