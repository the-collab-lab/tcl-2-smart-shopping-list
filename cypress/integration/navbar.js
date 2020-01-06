describe("Show the navbar", function() {
  beforeEach(function() {
    window.localStorage.setItem('uniqueToken', 'token1234');
  });

  afterEach(function() {
    window.localStorage.removeItem('uniqueToken');
  });

  it('Verifies that the navbar is present on the list page', function() {
      cy.visit('/list')
      cy.get('[data-cy=addNavItem]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/add')
      })

    it('Verifies that the navbar is present on the add item page', function() {
      cy.visit('/list')
      cy.get('[data-cy=listNavItem]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/list')
  })

});
