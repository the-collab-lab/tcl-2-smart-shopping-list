describe("My First Test", function() {
  it("Visits the App", function() {
    cy.visit("localhost:3000");
    cy.contains("Add Item").click();
  });
});
