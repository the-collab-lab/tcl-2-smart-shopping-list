describe("Show a list", function() {
  it('Changes url to represent current view when clicked', function() {
		cy.visit('/add')
		cy.contains('List').click()
		cy.url().should('include', '/list')
	})
});
