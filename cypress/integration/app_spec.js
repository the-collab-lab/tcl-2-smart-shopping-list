describe('Week 1 Tests', function() {
  it('confirms the testing suite is configured', function() {
    expect(true).to.equal(true)
  })
  it('test to see if the home page loads', function() {
    cy.visit('/')
  })
})