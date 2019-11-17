describe("Input Field Reset", function() {
  it("Resets input field after addItem button click", function() {
    cy.visit("localhost:3000");
    cy.get(".inputField").type("marshmallows");

    cy.get(".addItemButton").click();

    cy.get(".inputField").should("have.value", "");
  });
});
