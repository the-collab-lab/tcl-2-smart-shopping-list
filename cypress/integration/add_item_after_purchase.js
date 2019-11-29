describe("Add Item After Purchase", function() {
  it("Selects correct radio button", function() {
    cy.visit("/add");
    cy.get("#soonButton").should("have.value", "soon");
  });
});
