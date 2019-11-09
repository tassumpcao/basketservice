/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-disabled-tests */
describe('Price Controller Unit Test', () => {
  
  describe('Without discount and without conversion', () => {

    // eslint-disable-next-line max-statements
    it('Calculate totals with basket containing different products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'USD'
      };
     
    });

    it('Calculate totals with basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'USD'
      };
     
    });

    it('Calculate totals with basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Apples', 'Apples', 'Apples', 'Soup', 'Soup', 'Banana'],
        currency: 'USD'
      };
      
    });
    

    it('Return error for partial unknown products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana', 'Orange'],
        currency: 'USD'
      };
      
    });

    it('Return error for all unknown products', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'USD'
      };
      
    });

    it('Return error for missing values on the request', () => {
      const requestBody = {
        currency: 'USD'
      };
      
    });

    it('Return error for unknown exchange rate', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };
      
    });
  });

  describe('Calculate totals with discount and no conversion', () => {
    it('Calculate totals with discount and basket containing different products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana'],
        currency: 'USD'
      };
      
    });

    it('Calculate totals with discount and basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'USD'
      };
      
    });

    it('Calculate totals with discount and basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Apples', 'Apples', 'Apples', 'Soup', 'Soup', 'Banana'],
        currency: 'USD'
      };
      
    });

    it('Return error for partial unknown products which one of the products has discount', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'USD'
      };
      
    });

    it('Return error for missing values on the request with a product with discount', () => {
      const requestBody = {
        currency: 'USD'
      };
      
    });

    it('Return error for unknown exchange rate with a product with discount', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };
      
    });
  });

  describe('Calculate totals with conversion and no discount', () => {

    it('Calculate totals with conversion and basket containing different products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      
    });

    it('Calculate totals with conversion and basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'EUR'
      };
      
    });

    it('Calculate totals with conversion and basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Apples', 'Apples', 'Apples', 'Soup', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      
    });

    it('Return error for partial unknown products and with conversion', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'EUR'
      };
      
    });

    it('Return error for missing values on the request with conversion', () => {
      const requestBody = {
        currency: 'USD'
      };
      
    });

    it('Return error for unknown exchange rate', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };
      
    });
  });

  describe('Calculate totals with discount and conversion', () => {
    it('Calculate totals with conversion and discount and basket containing different products', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      
    });

    it('Calculate totals with conversion and discount and basket containing duplicated products with no ordering', () => {
      const requestBody = {
        items: ['Apples', 'Soup', 'Apples', 'Soup', 'Banana', 'Apples'],
        currency: 'EUR'
      };
      
    });

    it('Calculate totals with conversion and discount and basket containing duplicated products ordered', () => {
      const requestBody = {
        items: ['Apples', 'Apples', 'Apples', 'Soup', 'Soup', 'Banana'],
        currency: 'EUR'
      };
      
    });

    it('Return error for partial unknown products and with conversion and discount ', () => {
      const requestBody = {
        items: [ 'Orange', 'Strawberry'],
        currency: 'EUR'
      };
      
    });

    it('Return error for missing values on the request with conversion and discount', () => {
      const requestBody = {
        currency: 'USD'
      };
      
    });

    it('Return error for unknown exchange rate and product with discount', () => {
      const requestBody = {
        items: [ 'Apple', 'Banana'],
        currency: 'BRL'
      };
      
    });

  });


});