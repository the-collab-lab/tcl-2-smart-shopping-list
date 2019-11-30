describe("Show the back button", function() {
      it('Verifies that the back button is on the add item view', function() {
        cy.visit('/add')
        cy.get('[data-cy=Back]').click()
    })
  });
  

  