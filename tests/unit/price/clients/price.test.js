/* eslint-disable no-unused-vars */
const priceClient = require('../../../../src/price/clients/price');

describe('Price Client Unit Test', () => {
  
  describe('Success scenario', () => {

    it('Return price for a product', async () => {
      const price = await priceClient().getPricesByName('Apples Price Unit');
      expect(price).toBeDefined();
      expect(price).toBeGreaterThan(0.0);
    });
  });

  describe('Failure scenario', () => {
    it('Return an error for an unknown product', async () => {
      try {
        const price = await priceClient().getPricesByName('Orange Price Unit');  
      } catch (error) {
        expect(error.code).toBe('422');  
      }
    });
  });
});
