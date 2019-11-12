const errors = require('errors');
const axios = require('axios');
/* eslint-disable no-unused-vars */
const currencyClient = require('../../../../src/price/clients/currency');

jest.mock('axios');

describe('Currency Client Unit Test', () => {
  
  describe('Success scenario', () => {

    it('Return a valid currency rate for a currency', () => {
      const response = {
        data: {
          quotes: {
            USDEUR: 0.90
          }
        }
      };
      axios.get.mockResolvedValue(response);

      return currencyClient().getRateForCurrency('EUR').then((rate) => {
        expect(rate).toBeGreaterThan(0);
      });

    });
    it('Return a 1 USD for currency USD', () => {
      const response = {
        data: {
          quotes: {
            USDUSD: 1
          }
        }
      };
      axios.get.mockResolvedValue(response);

      return currencyClient().getRateForCurrency('USD').then((rate) => {
        expect(rate).toBe(1);
      });
    });
  });

  describe('Failure scenario', () => {

    it('Return error for a rate not supported', async() => {
      try {
        const rate = await currencyClient().getRateForCurrency('BRL');
        throw new Error('Didnt pass');
      } catch (error) {
        expect(error.code).toBe('422');
      }
    });
    it('Return internal server error for api not found', async () => {
      const response = {
        data: {
          quotes: {
            USDEUR: 0.90
          }
        }
      };
      axios.get.mockImplementation(() => {
        throw new errors.Http500Error('Error trying to retrieve currency');
      });
      
      try {
        const rate = await currencyClient().getRateForCurrency('EUR');
        throw new Error('Didnt pass');
      } catch (error) {
        expect(error.code).toBe('500');
      }
    });

  });
});
