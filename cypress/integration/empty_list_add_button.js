describe("Show Add button for empty list", function() {
    beforeEach(function() {
      window.localStorage.removeItem("uniqueToken")
      cy.visit('/')
      cy.get(".tokenButton").click();
    });

    it("Checks for the Add Item button on empty list", function() {
        cy.visit("/list");

        cy.contains('Add your first Item');
        // cy.contains('.emptyAddItemButton');
      });

      it("Double checks that user sees list after adding an item", function() {
        cy.visit("/add")

        cy.get(".inputField").type("New test item");

        cy.get(".addItemButton").click();

        cy.get('[data-cy=Back]').click();

        cy.contains("New test item");
      });

    });