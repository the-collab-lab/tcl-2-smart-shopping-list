describe("Show a list", function() {
  it('Changes url to represent current view when clicked', function() {
		cy.visit("/");
		cy.get(".tokenButton").click();
		cy.visit('/list')
		cy.contains('List').click()
		cy.url().should('include', '/list')
	});

    it("Checks that new item is all lowercase", function() {
      cy.visit("/");
      cy.get(".tokenButton").click();
      cy.contains("Add").click();
      cy.get(".inputField").type("Cream Cheese");
      cy.get(".addItemButton").click();
      cy.contains("List").click();
      expect(cy.contains("cream cheese"));
    });
});
