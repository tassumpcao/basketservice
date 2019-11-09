/* eslint-disable max-nested-callbacks */
const errors = require('errors');
const httpMocks = require('node-mocks-http');
const priceController = require('../../../../src/price/controllers/price');
const basketService = require('../../../../src/price/services/basket');
const currencyService = require('../../../../src/price/services/currency');
const promotionService = require('../../../../src/price/services/promotion');

basketService.create = jest.fn();
currencyService.convert = jest.fn();
promotionService.applyDiscount = jest.fn();

describe('Price Controller Unit Test', () => {
  
  describe('Success scenario', () => {

    // eslint-disable-next-line max-statements
    it('Return totals and currency', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana'],
        currency: 'USD'
      };

      basketService.create.mockImplementation(async (items) => {
        const basket = { items: [] };
        await items.forEach((item) => {
          basket.items.push({
            productName: item,
            price: 2.00
          });
        });
        return basket;
      });
      
      promotionService.applyDiscount.mockImplementation(async (basket) => {
        const order = 
          { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
            total: 6.00, currency: 'USD', orderItems: basket.items };
        return order;
      });
      
      currencyService.convert.mockImplementation((order) => {
        return order;
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
        items: ['Apples', 'Soup', 'Banana', 'Orange'],
        currency: 'USD'
      };

      basketService.create.mockImplementation(async () => {
        throw new errors.Http422Error({ message: 'Product(s) not found:[ Orange ]' });
      });
      
      promotionService.applyDiscount.mockImplementation(async (basket) => {
        const order = 
          { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
            total: 6.00, currency: 'USD', orderItems: basket.items };
        return order;
      });
      
      currencyService.convert.mockImplementation((order) => {
        return order;
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
      })
    });

    it('Return error for unknown exchange rate', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };

      basketService.create.mockImplementation(async (items) => {
        const basket = { items: [] };
        await items.forEach((item) => {
          basket.items.push({
            productName: item,
            price: 2.00
          });
        });
        return basket;
      });
      
      promotionService.applyDiscount.mockImplementation(async (basket) => {
        const order = 
          { subtotal: 6.00, discounts: [], discountAmt: 0.0, 
            total: 6.00, currency: 'USD', orderItems: basket.items };
        return order;
      });
      
      currencyService.convert.mockImplementation(() => {
        throw new errors.Http422Error({ message: 'Currency not found:[ BRL ]' });
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
