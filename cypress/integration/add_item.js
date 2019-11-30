describe("Add Item To List", function() {
  beforeEach(function () {
    window.localStorage.setItem('uniqueToken', 'token1234')
  });

  it("Checks that entered items are added to list", function() {
    cy.visit("/add");
    cy.get(".inputField").type("New Cypress Item");

    cy.get(".addItemButton").click();
  });

  it("Input field accepts input", function() {
    cy.visit("/add");
    cy.get(".inputField")
      .type("watermelon")
      .should("have.value", "watermelon");
  });

  it("Resets input field after addItem button click", function() {
    cy.visit("/add");
    cy.get(".inputField").type("marshmallows");

    cy.get(".addItemButton").click();

    cy.get(".inputField").should("have.value", "");
  });

  it("Selects correct frequency button", function() {
    cy.visit("/add");
    cy.get("#soonButton").should("have.value", "soon");
  });

  it("Checks that the selected frequency button get focused", function() {
    cy.visit("/add");
    cy.get("#soonButton")
      .click({ force: true })
      .focused()
      .should("have.id", "soonButton");
  });
});
