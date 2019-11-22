describe("Add Item To List", function() {
  beforeEach(function () {
    window.localStorage.setItem('uniqueToken', 'token1234')
  });

  it("Checks that entered items are added to list", function() {
    cy.visit("/add");
    cy.get(".inputField").type("New Cypress Item");

    cy.get(".addItemButton").click();
  });
});
