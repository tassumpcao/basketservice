const promotions = require('../../../src/price/clients/fixtures/promotions');

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
    return promo;
  };
  return { getPromoForProduct };
};
