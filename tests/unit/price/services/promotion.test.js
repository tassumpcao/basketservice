const promoService = require('../../../../src/price/services/promotion');
const promoClient = require('../../../../src/price/clients/promotion');

jest.mock('../../../../src/price/clients/promotion');
const basket = {};

describe('Promotion Service Unit Test', () => {
  
  describe('Success scenario', () => {
    beforeEach(() => {
      basket.items = [{
        name: 'Apples',
        unitPrice: 2.0,
        quantity: 3
      },
      {
        name: 'Milk',
        unitPrice: 4.0,
        quantity: 4
      },
      {
        name: 'Soup',
        unitPrice: 4.0,
        quantity: 4
      }
      ];
    });
    
    it('Apply promotion of percentage discount for one product', async () => {

      promoClient.mockImplementation(() => {
        const getPromoForProduct = (item) => {
          let promo;
          if (item.name === 'Apples'){
            promo = {
              name: 'Apple Promotion',
              pcPromoDiscount: 0.1,
              vlPromoDiscount: 0.0
            };
          };
          return promo;
        };
        return { getPromoForProduct };
      });


      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBeGreaterThan(0);
      expect(order.subtotal).toBe('38.00');
      expect(order.discountAmt).toBe('0.60');
    });

    it('Apply promotion of percentage discount for more than one product', async () => {
      
      promoClient.mockImplementation(() => {
        const getPromoForProduct = (item) => {
          let promo;
          if (item.name === 'Apples'){
            promo = {
              name: 'Apple Promotion',
              pcPromoDiscount: 0.2,
              vlPromoDiscount: 0.0
            };
          } else if (item.name === 'Milk'){
            promo = {
              name: 'Milk Promotion',
              pcPromoDiscount: 0.3,
              vlPromoDiscount: 0.0
            };
          }
          return promo;
        };
        return { getPromoForProduct };
      });
      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBeGreaterThan(1);
      expect(order.subtotal).toBe('38.00');
      expect(order.discountAmt).toBe('6.00');
    });

    it('Apply promotion of value discount for one product', async () => {

      promoClient.mockImplementation(() => {
        const getPromoForProduct = (item) => {
          let promo;
          if (item.name === 'Apples'){
            promo = {
              name: 'Apple Promotion',
              pcPromoDiscount: 0.0,
              vlPromoDiscount: 1.0
            };
          };
          return promo;
        };
        return { getPromoForProduct };
      });

      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBeGreaterThan(0);
      expect(order.subtotal).toBe('38.00');
      expect(order.discountAmt).toBe('3.00');
    });

    it('Apply promotion of value discount for more than one product', async () => {

      promoClient.mockImplementation(() => {
        const getPromoForProduct = (item) => {
          let promo;
          if (item.name === 'Apples'){
            promo = {
              name: 'Apple Promotion',
              pcPromoDiscount: 0.0,
              vlPromoDiscount: 1.0
            };
          } else if (item.name === 'Milk'){
            promo = {
              name: 'Milk Promotion',
              pcPromoDiscount: 0.0,
              vlPromoDiscount: 2.0
            };
          }
          return promo;
        };
        return { getPromoForProduct };
      });

      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBeGreaterThan(1);
      expect(order.subtotal).toBe('38.00');
      expect(order.discountAmt).toBe('11.00');
    });

    it('Apply promotion of value and percentage discount for more than one product', async () => {
      promoClient.mockImplementation(() => {
        const getPromoForProduct = (item) => {
          let promo;
          if (item.name === 'Apples'){
            promo = {
              name: 'Apple Promotion',
              pcPromoDiscount: 0.2,
              vlPromoDiscount: 1.0
            };
          } else if (item.name === 'Milk'){
            promo = {
              name: 'Milk Promotion',
              pcPromoDiscount: 0.3,
              vlPromoDiscount: 2.0
            };
          }
          return promo;
        };
        return { getPromoForProduct };
      });
      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBeGreaterThan(1);
      expect(order.subtotal).toBe('38.00');
      expect(order.discountAmt).toBe('17.00');
    });
  });

  describe('Failure scenario', () => {
    it('Dont apply discount due to missing promotion', async () => {
      promoClient.mockImplementation(() => {
        const getPromoForProduct = () => {
          return undefined;
        };
        return { getPromoForProduct };
      });

      const order = await promoService().applyDiscount(basket);
      expect(order.discounts.length).toBe(0);
      expect(order.subtotal).toBe('38.00');
      expect(order.orderTotal).toBe(order.subtotal);
      expect(order.discountAmt).toBe('0.00');
    });

    
  });
});