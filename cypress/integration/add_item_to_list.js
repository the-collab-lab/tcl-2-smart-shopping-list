describe("Add Item To List", function() {
  it("Checks that entered items are added to list", function() {
    cy.visit("/add").get('.tokenButton').click();
    cy.get(".inputField").type("New Cypress Item");

    cy.get(".addItemButton").click();
  });
});
