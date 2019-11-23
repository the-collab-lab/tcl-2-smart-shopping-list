describe("Accept Input", function() {
  it("Input field accepts input", function() {
    cy.visit("/list").get('.tokenButton').click();
    cy.visit("/add");
    cy.get(".inputField")
      .type("watermelon")
      .should("have.value", "watermelon");
  });
});
