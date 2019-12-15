import calculateNewPurchaseValues from '../../src/calculations'

describe("Show list of items", function() {
  describe("Empty List", function() {
    beforeEach(function() {
      window.localStorage.setItem('uniqueToken', 'empty_test_token');
    });

    it("Checks for the 'add first item' button on empty list", function() {
      cy.visit('/list');
      cy.get('#emptyListAddItem').click();
    });
  });

  describe('List with Items', function() {
    beforeEach(function() {
      window.localStorage.setItem('uniqueToken', 'token1234');
    });

    it('User sees list after adding an item', function() {
      cy.visit('/add');
      cy.get('.inputField').type('New test item');
      cy.get('#addItemButton').click();
      cy.get('[data-cy=Back]').click();
      cy.contains('New test item');
    });

    it('Checks that item special characters & capitalization are not removed when rendered in list', function() {
      cy.visit('/add');
      cy.get('.inputField').type('Cream!.Cheese');
      cy.get('#addItemButton').click();
      cy.contains('List').click();
      expect(cy.contains('Cream!.Cheese'));
    });

    it('Checks that list item has css class .purchasedItem after click', function() {
      cy.visit('/add');
      cy.get('.inputField').type('Purchased Item');
      cy.get('#addItemButton').click();
      cy.get('[data-cy=Back]').click();
      cy.contains('Purchased Item').click();
      cy.get('.purchasedItem');
      expect(cy.contains('Purchased Item'));
    });
  });

  afterEach(function() {
    window.localStorage.removeItem('uniqueToken');
  });

  describe("Update purchase values", function() {
    it("Calculates new values when purchased", function() {
      const today = new Date("2019-11-30")
      let testData = {
        id: 'Test Data',
        numberOfDays: 14,
        numberOfPurchases: 3,
        dateOfPurchase: new Date("2019-11-01"),
      }

      let newTestData = calculateNewPurchaseValues(testData, today);
      console.log('DATE OF PURCHASE: ',testData.dateOfPurchase)
      console.log(newTestData);
      expect(newTestData.numberOfDays).to.eq(26);
      expect(newTestData.numberOfPurchases).to.eq(4);
    })
  })
});
