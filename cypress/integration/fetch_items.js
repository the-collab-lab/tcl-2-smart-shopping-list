describe("Show a list", function() {
  it("Changes url to represent current view when clicked", function() {
    cy.visit("/list");
    cy.contains("List").click();
    cy.url().should("include", "/list");
  });
  //   it("Checks that new item has lowercase classname", function() {
  //     cy.visit("/add");
  //     cy.get(".inputField").type("Strawberryaiquiri");
  //     // cy.get("#soonButton").click({ force: true });
  //     cy.get(".addItemButton").click();

  //     // cy.visit("/list");
  //     // cy.get(".strawberry daiquiri").contains("strawberry daiquiri");
  //   });
});
