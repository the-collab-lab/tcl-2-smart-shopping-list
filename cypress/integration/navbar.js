describe("Show a the navbar", function() {
    it('Verifies that the navbar is present on the list page', function() {
          cy.visit('/list')
          cy.contains('List') & cy.contains('Add')
      })

      it('Verifies that the navbar is present on the add item page', function() {
        cy.visit('/add')
        cy.contains('Navbar') & cy.contains('List') & cy.contains('Add')
    })
  });
  