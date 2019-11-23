describe("Add item with token", function() {
  it("Checks if item is added to list when user has a token", function() {
    cy.visit("/");
    cy.get(".tokenButton").click();
    cy.contains("Add").click();
    cy.get(".inputField").type("New Cypress Item");
    cy.get(".addItemButton").click();
    cy.contains("List").click();
    expect(cy.contains("New Cypress Item"));
  });
});
