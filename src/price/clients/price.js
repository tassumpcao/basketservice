const pino = require('pino');
const errors = require('errors');
const items = require('../../../src/price/clients/fixtures/price');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

module.exports = () => {
  const getPricesByName = (productName) => {
    let price;
    items.forEach((item) => {
      if (item.name === productName) price = item.price;
    });
    if (!price) {
      logger.error(`Missing product data: ${productName}`);
      throw new errors.Http422Error(`Missing product data: ${productName}`);
    }
    logger.debug(`priceClient.getPricesByName - price found successfully: ${price}`);
    return price;
  };
  return { getPricesByName };
};
