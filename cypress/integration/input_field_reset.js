describe("Input Field Reset", function() {
  beforeEach(function () {
    window.localStorage.setItem('uniqueToken', 'token1234')
  });
  
  it("Resets input field after addItem button click", function() {
    cy.visit("/add");
    cy.get(".inputField").type("marshmallows");

    cy.get(".addItemButton").click();

    cy.get(".inputField").should("have.value", "");
  });
});
