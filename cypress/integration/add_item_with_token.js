describe("Add item with token", function() {
  it("Checks if item is added to list when user has a token", function() {
    cy.visit("/");
    cy.get(".tokenButton").click();
    cy.contains("Add").click();
    cy.get(".inputField").type("new cypress item");
    cy.get(".addItemButton").click();
    cy.contains("List").click();
    expect(cy.contains("new cypress item"));
  });
});
