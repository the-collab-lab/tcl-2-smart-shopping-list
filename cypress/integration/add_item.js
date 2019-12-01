describe("Add Item To List", function() {
  beforeEach(function () {
    window.localStorage.setItem('uniqueToken', 'token1234')
  });

  it("Checks that entered items are added to list", function() {
    cy.visit("/add");
    cy.get(".itemInputField").type("New Cypress Item");

    cy.get(".addItemButton").click();
  });

  it("Input field accepts input", function() {
    cy.visit("/add");
    cy.get(".itemInputField")
      .type("watermelon")
      .should("have.value", "watermelon");
  });

  it("Resets input field after addItem button click", function() {
    cy.visit("/add");
    cy.get(".itemInputField").type("marshmallows");

    cy.get(".addItemButton").click();

    cy.get(".itemInputField").should("have.value", "");
  });
});
