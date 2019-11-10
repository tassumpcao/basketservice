/* eslint-disable no-unused-vars */

const errors = require('errors');
const basketService = require('../../../../src/price/services/basket');
const priceClient = require('../../../../src/price/clients/price');



priceClient.getPricesByName = jest.fn();

describe('Basket Service Unit Test', () => {
  
  describe('Success scenario', () => {

    // eslint-disable-next-line max-statements
    it('Return basket for different unique products', async () => {
      const items = ['Apples', 'Soup', 'Banana'];
      priceClient.getPricesByName.mockImplementation(() => {
        return 2.0;
      });
      const basket = await basketService().create(items);
      expect(basket.items.length).toBe(3);
      expect(basket.items[0].unitPrice).toBeDefined();
      expect(basket.items[1].unitPrice).toBeDefined();
      expect(basket.items[2].unitPrice).toBeDefined();
    });

    it('Return basket for duplicated products with no sorting', async () => {
      const items = ['Apples', 'Apples', 'Soup', 'Banana', 'Apples', 'Banana'];
      priceClient.getPricesByName.mockImplementation(() => {
        return 2.0;
      });
      const basket = await basketService().create(items);
      expect(basket.items.length).toBe(3);
      expect(basket.items[0].unitPrice).toBeDefined();
      expect(basket.items[1].unitPrice).toBeDefined();
      expect(basket.items[2].unitPrice).toBeDefined();

      items.forEach((item) => {
        if (item.product === 'Apples')
          expect(item.quantity).toBe(3);
        else if (item.product === 'Soup')
          expect(item.quantity).toBe(1);
        else if (item.product === 'Banana')
          expect(item.quantity).toBe(2);
      });
    });

    it('Return basket for duplicated products with sorting', async () => {
      const items = ['Apples', 'Apples', 'Banana', 'Soup', 'Soup'];

      priceClient.getPricesByName.mockImplementation(() => {
        return 2.0;
      });

      const basket = await basketService().create(items);
      expect(basket.items.length).toBe(3);
      expect(basket.items[0].unitPrice).toBeDefined();
      expect(basket.items[1].unitPrice).toBeDefined();
      expect(basket.items[2].unitPrice).toBeDefined();

      items.forEach((item) => {
        if (item.product === 'Apples')
          expect(item.quantity).toBe(2);
        else if (item.product === 'Soup')
          expect(item.quantity).toBe(2);
        else if (item.product === 'Banana')
          expect(item.quantity).toBe(1);
      });
    });
  });

  describe('Failure scenario', () => {
    it('Return error for unknown product', async () => {
      const items = ['Orange'];
      priceClient.getPricesByName.mockImplementation((productName) => {
        throw new errors.Http422Error(`Missing product data: ${productName}`);
      });
      try {
        const basket = await basketService().create(items);
        throw new Error("didn't throw");
      } catch (error) {
        expect(error.code).toBe('422');
      }
      
    });
  });
});