describe("Accept Input", function() {
  it("Input field accepts input", function() {
    cy.visit("localhost:3000");
    cy.get(".inputField")
      .type("watermelon")
      .should("have.value", "watermelon");
  });
});
