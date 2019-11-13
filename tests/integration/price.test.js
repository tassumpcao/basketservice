const supertest = require('supertest');
const app = require('../../src/app');

/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-disabled-tests */
describe('Price Integration Test', () => {
  

  describe('Without discount and without conversion', () => {

    // eslint-disable-next-line max-statements
    it('Calculate totals with basket containing different products', () => {
      const requestBody = {
        items: ['Chocolate', 'Banana', 'Soup'],
        currency: 'USD'
      };
      
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.body.subtotal).toBe(res.body.total);
        expect(res.body.discounts.length).toBe(0);
      });
    });

    it('Calculate totals with basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Chocolate', 'Soup', 'Chocolate', 'Soup', 'Banana', 'Chocolate'],
        currency: 'USD'
      };

      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.body.subtotal).toBe(res.body.total);
        expect(res.body.discounts.length).toBe(0);
      });

    });

    it('Calculate totals with basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Chocolate', 'Chocolate', 'Chocolate', 'Soup', 'Soup', 'Chocolate'],
        currency: 'USD'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.body.subtotal).toBe(res.body.total);
        expect(res.body.discounts.length).toBe(0);
      });
    });
    

    it('Return error for partial unknown products', () => {
      const requestBody = {
        items: ['Chocolate', 'Soup', 'Banana', 'Orange'],
        currency: 'USD'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(422);
      });
    });

    it('Return error for all unknown products', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'USD'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(422);
      });
    });

    it('Return error for missing values on the request', () => {
      const requestBody = {
        currency: 'USD'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(400);
      });
    });

    it('Return error for unknown exchange rate', () => {
      const requestBody = {
        items: [ 'Chocolate', 'Banana'],
        currency: 'FSDJKFD'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(422);
      });
    });
  });

  describe('Calculate totals with discount and conversion', () => {
    it('Calculate totals with conversion and discount and basket containing different products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {

        expect(res.body.discounts[0]).toBe('Apple Sale Pc');
        expect(res.body.discounts.length).toBeGreaterThan(0);
      });
    });

    it('Calculate totals with conversion and discount and basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'EUR'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {

        expect(res.body.discounts[0]).toBe('Apple Sale Pc');
        expect(res.body.discounts.length).toBeGreaterThan(0);
      });
    });

    it('Calculate totals with conversion and discount and basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Apples', 'Apples', 'Apples', 'Soup', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.body.discounts[0]).toBe('Apple Sale Pc');
        expect(res.body.discounts.length).toBeGreaterThan(0);
      });
    });

    it('Return error for partial unknown products and with conversion and discount ', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'EUR'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(422);
      });
    });

    it('Return error for missing values on the request with conversion and discount', () => {
      const requestBody = {
        currency: 'EUR'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(400);
      });
    });

    it('Return error for unknown exchange rate and product with discount', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'ASDFSDF'
      };
      return supertest(app).post('/api/v1/checkout/price').send(requestBody).then((res) => {
        expect(res.statusCode).toBe(422);
      });
    });

  });


});