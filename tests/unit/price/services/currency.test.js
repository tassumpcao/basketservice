/* eslint-disable no-unused-vars */
const currrencyService = require('../../../../src/price/services/currency');
const currencyClient = require('../../../../src/price/clients/currency');

jest.mock('../../../../src/price/clients/currency');

describe('Currency Service Unit Test', () => {
  
  describe('Success scenario', () => {
    
    it('Convert order to EUR', async () => {
      const order = {
        subtotal: 20.00,
        discounts: ['Apple Sales'],
        discountAmt: 2.00,
        orderTotal: 18.00,
        currency: 'EUR'
      };
      const currency = 'EUR';
      
      currencyClient.mockImplementation(() => {
        const getRateForCurrency = () => {
          return 1.5;
        };
        return { getRateForCurrency };
      });

      const finalOrder = await currrencyService().convert(order, currency);
      expect(finalOrder).toBeDefined();
      expect(finalOrder.subtotal).toBe(30);
    });
  });
  describe('Failure scenarios', () => {
    it('Dont convert order due to currency be USD', async () => {
      const order = {
        subtotal: 20.00,
        discounts: ['Apple Sales'],
        discountAmt: 2.00,
        orderTotal: 18.00,
        currency: 'USD'
      };
      const currency = 'EUR';
      
      currencyClient.mockImplementation(() => {
        const getRateForCurrency = () => {
          return 1.00;
        };
        return { getRateForCurrency };
      });
      
      const finalOrder = await currrencyService().convert(order, currency);
      expect(finalOrder).toBeDefined();
      expect(finalOrder.subtotal).toBe(20);
    });
    it('Dont convert order due missing currency', async () => { 
      const order = {
        subtotal: 20.00,
        discounts: ['Apple Sales'],
        discountAmt: 2.00,
        orderTotal: 18.00,
        currency: 'BRL'
      };
      const currency = 'EUR';
      
      currencyClient.mockImplementation(() => {
        const getRateForCurrency = () => {
          return undefined;
        };
        return { getRateForCurrency };
      });
      try {
        const finalOrder = await currrencyService().convert(order, currency);
        throw new Error('Didnt throw');
      } catch (error) {
        expect(error.code).toBe('422');
        expect(error.message).toBe('Rate not found for currency: EUR');
      }
    });
  });
});
