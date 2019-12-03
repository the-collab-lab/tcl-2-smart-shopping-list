describe("Show a list", function() {
  it('Changes url to represent current view when clicked', function() {
		cy.visit("/");
		cy.get(".tokenButton").click();
		cy.visit('/list')
		cy.contains('List').click()
		cy.url().should('include', '/list')
	});

    it("Checks that new item has lowercase classname", function() {
      window.localStorage.setItem("uniqueToken", "token1234");
      // cy.visit("/");
      // cy.get(".tokenButton").click();
      cy.visit("/add");
      cy.get(".inputField").type("Toast");
      cy.get(".addItemButton").click();

      cy.visit("/list");
      cy.contains("toast");
    });
});
