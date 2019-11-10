const errors = require('errors');
const items = require('../../../src/price/clients/fixtures/price');

module.exports = () => {
  const getPricesByName = (productName) => {
    let price;
    items.forEach((item) => {
      if (item.name === productName) price = item.price;
    });
    if (!price) throw new errors.Http422Error(`Missing product data: ${productName}`);
    return price;
  };
  return { getPricesByName }
};
