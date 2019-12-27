describe('Item details view', function() {
  beforeEach(function() {
		window.localStorage.setItem('uniqueToken', 'token1234')
		const testDate = new Date('2019-01-01');
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
		cy.visit('/add');
		cy.get('.inputField').type('alpaca');
		cy.get('#addItemButton').click();
		cy.visit('list');
		expect(cy.contains('alpaca').click());
		cy.visit('/alpaca');
		// cy.get('#deleteItemButton').click();
		
		// cy.get('alpaca grub').should('not.exist');
	  })

	afterEach(function() {
		cy.deleteItem('token1234', 'banana');
	})
});
