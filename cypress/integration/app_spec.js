describe('Week 1 Tests', function() {
  it('confirms the testing suite is configured', function() {
    expect(true).to.equal(true)
	})
	
  it('home page loads', function() {
    cy.visit('/')
	})
	
	it('list page loads with content', function() {
		cy.visit('/list')
		cy.contains('This is the list page')
	})
})