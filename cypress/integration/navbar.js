describe("Show the navbar", function() {
    it('Verifies that the navbar is present on the list page', function() {
          cy.visit('/list')
          cy.contains('List') & cy.contains('Add')
      })

      it('Verifies that the navbar ispresent on the add item page', function() {
        cy.visit('/add')
        cy.contains('List') & cy.contains('Add')
    })

  });
  