
const pino = require('pino');
/* eslint-disable max-statements */
const promotionClient  = require('../clients/promotion');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

/**
 * This is the module responsible to handle all business logic of promotions.
 *
 */
module.exports = () => {
  
  /**
 * This is a function responsible to apply a promotion to an item from the basket.
 *
 * @param {object} item - item
 * @return {object} promoItem - Promotion item
 *
 */
  const applyPromotionForProduct = (item) => {
    
    const promo = promotionClient().getPromoForProduct(item);
    logger.debug(`promotionService.applyPromotionForProduct - promo retrieved successfully: ${promo}`);
    let promoItem;
    if (promo){
      promoItem = {};
      promoItem.name = promo.name;
      promoItem.unitDiscountAmt = item.unitPrice * promo.pcPromoDiscount 
        + promo.vlPromoDiscount;
      promoItem.finalPrice = item.unitPrice - promoItem.unitDiscountAmt;
    }
    return promoItem;
  };


  /**
 * This is a function responsible to apply discouts for the whole basket.
 *
 * @param {object} basket - basket object
 * @return {object} order - order object
 *
 */
  const applyDiscount = async (basket) => {
    const order = {};
    let subtotal = 0.0;
    const discounts = [];
    let discountAmt = 0.0;
    let orderTotal = 0.0;
    basket.items.forEach((item) => {
      const promoItem = applyPromotionForProduct(item);
      subtotal += item.unitPrice * item.quantity;
      if (promoItem){
        discountAmt += promoItem.unitDiscountAmt * item.quantity;
        orderTotal += promoItem.finalPrice * item.quantity;
        discounts.push(promoItem.name);
      } else
        orderTotal += item.unitPrice * item.quantity;
    });
    
    order.subtotal = subtotal.toFixed(2);
    order.discounts = discounts;
    order.discountAmt = discountAmt.toFixed(2);
    order.orderTotal = orderTotal.toFixed(2);
    logger.debug(`promotionService.applyDiscount - promo updated successfully: ${order}`);
    return order;
  };
  
  return { applyDiscount };
};
