/* eslint-disable no-unused-vars */

const errors = require('errors');
const basketService = require('../../../../src/price/services/basket');
const priceClient = require('../../../../src/price/clients/price');

jest.mock('../../../../src/price/clients/price');

describe('Basket Service Unit Test', () => {
  
  describe('Success scenario', () => {

    beforeEach(() => {
      priceClient.mockImplementation(() => {
        const getPricesByName = () => {
          return 2.0;
        };
        return { getPricesByName };
      });
    });
    // eslint-disable-next-line max-statements
    it('Return basket for different unique products', async () => {
      const items = ['Apples', 'Soup', 'Banana'];
      
      const basket = await basketService().create(items);
      expect(basket.items.length).toBe(3);
      expect(basket.items[0].unitPrice).toBeDefined();
      expect(basket.items[1].unitPrice).toBeDefined();
      expect(basket.items[2].unitPrice).toBeDefined();
    });

    it('Return basket for duplicated products with no sorting', async () => {
      const items = ['Apples', 'Apples', 'Soup', 'Banana', 'Apples', 'Banana'];
  
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
     
      priceClient.mockImplementation(() => {
        const getPricesByName = (productName) => {
          throw new errors.Http422Error(`Missing product data: ${productName}`);
        };
        return { getPricesByName };
      });

      try {
        const basket = await basketService().create(items);
        throw new Error("didn't throw");
      } catch (error) {
        expect(error.code).toBe('422');
        expect(error.message).toBe('Missing product data: Orange');
      }
      
    });
  });
});