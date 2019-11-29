describe("Add Item After Purchase", function() {
  it("Selects correct radio button", function() {
    cy.visit("/add");
    cy.get("#soonButton").should("have.value", "soon");
  });

  it("Checks that the selected radio button get focused", function() {
    cy.visit("/add");
    cy.get("#soonButton")
      .click({ force: true })
      .focused()
      .should("have.id", "soonButton");
  });
});
