describe("Check if landing page shows list", function() {
  it("Shows the user the Main page if they have a token stored", function() {
    cy.visit("/");
    cy.get(".tokenButton").click();
    expect(cy.contains("List"));
  });
});
