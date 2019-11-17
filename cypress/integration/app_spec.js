describe('Week 1 Tests', function() {
  it('Confirms the testing suite is configured', function() {
    expect(true).to.equal(true)
	})
	
  it('Loads home page', function() {
    cy.visit('/')
	})
	
	it('Loads list page with content', function() {
		cy.visit('/list')
		cy.contains('Items')
  })
  
  it('Loads add item page with content', function() {
		cy.visit('/add')
		cy.contains('Add Item')
	})

	it('Changes url to represent current view when clicked', function() {
		cy.visit('/')
		cy.contains('List').click()
		cy.url().should('include', '/list')
	})
})
