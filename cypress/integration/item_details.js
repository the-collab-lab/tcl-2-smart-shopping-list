describe('Item details view', function() {
  beforeEach(function() {
		window.localStorage.setItem('uniqueToken', 'token1234')
  });
	
	it('Shows current date as last purchase date when purchased today', function() {
		let todayString = new Date().toDateString();

		cy.visit('/list');
		cy.get('#banana').click();
		cy.visit('/banana');
		cy.contains(todayString);
	});
});
