describe('Item details view', function() {
  beforeEach(function() {
		window.localStorage.setItem('uniqueToken', 'token1234')
		const testDate = new Date('2019-01-01');
		cy.addItem('token1234', 'banana', testDate);
  });
	
	it('Shows current date as last purchase date when purchased today', function() {
		let todayString = new Date().toDateString();

		cy.visit('/list');
		cy.get('#banana').click();
		cy.wait(2000);
		cy.visit('/banana');
		cy.contains(todayString);
	});

	afterEach(function() {
		cy.deleteItem('token1234', 'banana');
	})
});
