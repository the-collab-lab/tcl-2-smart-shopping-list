describe('Item details view', function() {
	const testDate = new Date('2019-01-01');

  beforeEach(function() {
		window.localStorage.setItem('uniqueToken', 'token1234')
		cy.addItem('token1234', 'banana', testDate);
  });
	
	it('Shows current date as last purchase date when purchased today', function() {
		const todayString = new Date().toDateString();

		cy.visit('/list');
		cy.get('#banana').click();
		cy.wait(2000);
		cy.visit('/banana');
		cy.contains(todayString);
	});

	
	it('Does the delete item button function correctly?', function() {
		cy.addItem('token1234', 'alpaca', testDate, 2);
		cy.visit('/alpaca');
		cy.get('#deleteItemButton').click();
		cy.visit('/list');
		cy.get('.listFrame').should('not.contain', 'alpaca')
	  })

	afterEach(function() {
		cy.deleteItem('token1234', 'banana');
	})
});
