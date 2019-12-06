describe("Show the back button", function() {
  beforeEach(function() {
    window.localStorage.setItem("uniqueToken", "token1234")
  });
  
  it('Verifies that the back button is on the add item view', function() {
    cy.visit('/add')
    cy.get('[data-cy=Back]').click()
    cy.url().should('include', '/list')
  });
});
  

  