/* eslint-disable max-nested-callbacks */
const errors = require('errors');
const httpMocks = require('node-mocks-http');
const priceController = require('../../../../src/price/controllers/price');
const basketService = require('../../../../src/price/services/basket');
const currencyService = require('../../../../src/price/services/currency');
const promotionService = require('../../../../src/price/services/promotion');

jest.mock('../../../../src/price/services/basket');
jest.mock('../../../../src/price/services/currency');
jest.mock('../../../../src/price/services/promotion');


describe('Price Controller Unit Test', () => {
  
  describe('Success scenario', () => {

    // eslint-disable-next-line max-statements
    it('Return totals and currency', () => {
      const requestBody = {
        items: ['Apples Price Unit', 'Soup Price Unit', 'Banana Price Unit'],
        currency: 'USD'
      };

      basketService.mockImplementation(() => {
        const create = async (items) => {
          const basket = { items: [] };
          await items.forEach((item) => {
            basket.items.push({
              productName: item,
              price: 2.00
            });
          });
          return basket;
        };
        return { create };
      });
      
      promotionService.mockImplementation(() => {
        const applyDiscount = (basket) => {
          const order = 
            { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
              orderTotal: 6.00, currency: 'USD', orderItems: basket.items };
          return order;
        };
        return { applyDiscount };
      });
      
      currencyService.mockImplementation(() => {
        const convert = (order) => {
          return order;
        };
        return { convert };
      });
     
      const req = httpMocks.createRequest({ body: requestBody });
      const res = httpMocks.createResponse();

      return priceController().calculatePriceForBasket(req, res).then(() => {
        expect(res.statusCode).toBe(200);
      });
    });
  });
  describe('Failure scenarios', () => {
    it('Return error for unknown products', () => {
      const requestBody = {
        items: ['Apples Price Unit', 'Soup', 'Banana', 'Orange'],
        currency: 'USD'
      };

      basketService.mockImplementation(async () => {
        const create = () => {
          throw new errors.Http422Error({ message: 'Product(s) not found:[ Orange ]' });
        };
        return { create };
      });
      
      promotionService.mockImplementation(() => {
        const applyDiscount = (basket) => {
          const order = 
            { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
              orderTotal: 6.00, currency: 'USD', orderItems: basket.items };
          return order;
        };
        return { applyDiscount };
      });
      
      currencyService.mockImplementation(() => {
        const convert = (order) => {
          return order;
        };
        return { convert };
      });

      const req = httpMocks.createRequest({ body: requestBody });
      const res = httpMocks.createResponse();
      return priceController().calculatePriceForBasket(req, res).then(() => {
        
      }).catch((error) => {
        expect(error.code).toBe('422');
        expect(error.message).toBe('Product(s) not found:[ Orange ]');
      });
    });

    it('Return error for missing values on the request', () => {
      const requestBody = {
        currency: 'USD'
      };
      const req = httpMocks.createRequest({ body: requestBody });
      const res = httpMocks.createResponse();
      return priceController().calculatePriceForBasket(req, res).then(() => {
      }).catch((error) => { 
        expect(error.status).toBe('400');
        expect(error.message).toBe('Missing mandatory parameters: [ items ]');
      });
    });

    it('Return error for unknown exchange rate', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };

      basketService.mockImplementation(() => {
        const create = async (items) => {
          const basket = { items: [] };
          await items.forEach((item) => {
            basket.items.push({
              productName: item,
              price: 2.00
            });
          });
          return basket;
        };
        return { create };
      });
      
      promotionService.mockImplementation(() => {
        const applyDiscount = (basket) => {
          const order = 
            { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
              orderTotal: 6.00, currency: 'USD', orderItems: basket.items };
          return order;
        };
        return { applyDiscount };
      });
      
      currencyService.mockImplementation(() => {
        const convert = () => {
          throw new errors.Http422Error({ message: 'Currency not found:[ BRL ]' });
        };
        return { convert };
      });

      const req = httpMocks.createRequest({ body: requestBody });
      const res = httpMocks.createResponse();
      return priceController().calculatePriceForBasket(req, res).then(() => {
        
      }).catch((error) => {
        expect(error.code).toBe('422');
        expect(error.message).toBe('Currency not found:[ BRL ]');
      });
    });
  });
});
