const promoClient = require('../../../../src/price/clients/promotion');

describe('Promotion Client Unit Test', () => {
  
  describe('Success scenario', () => {
    
    it('Return promotion for product with min quantitty elegible', async () => {
      const item = {
        name: 'Apples Promotion Unit',
        unitPrice: 2.0,
        quantity: 3
      };
      const promoItem = promoClient().getPromoForProduct(item);
      expect(promoItem.name).toBe('Apples Sale');
      expect(promoItem.pcPromoDiscount).not.toBeUndefined();
      expect(promoItem.vlPromoDiscount).not.toBeUndefined();
    });

    it('Return promotion for product with min quantity elegible and more than one promotion', async () => {
      const item = {
        name: 'Milk Promotion Unit',
        unitPrice: 4.0,
        quantity: 4
      };
      const promoItem = promoClient().getPromoForProduct(item);
      expect(promoItem.name).toBe('Milk Sale Pc');
      expect(promoItem.pcPromoDiscount).not.toBeUndefined();
      expect(promoItem.vlPromoDiscount).not.toBeUndefined();
    });
    it('Dont return promotion for product with min quantitty not elegible', async () => {
      const item = {
        name: 'Orange Promotion Unit',
        unitPrice: 2.0,
        quantity: 1
      };
      const promoItem = promoClient().getPromoForProduct(item);
      expect(promoItem).not.toBeDefined();
    });

  });
});
