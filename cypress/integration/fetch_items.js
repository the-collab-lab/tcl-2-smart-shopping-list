describe("Show list of items", function() {
	describe("Empty List", function() {
		beforeEach(function() {
      window.localStorage.setItem("uniqueToken", "empty_test_token")
		});
		
		it("Checks for the 'add first item' button on empty list", function() {
      cy.visit("/list");
      cy.get(".emptyAddItemButton").click();
		});
	});

	describe("List with Items", function() {
		beforeEach(function() {
      window.localStorage.setItem("uniqueToken", "token1234")
		});

    it("User sees list after adding an item", function() {
      cy.visit("/add")
      cy.get(".inputField").type("New test item");
      cy.get(".addItemButton").click();
      cy.get('[data-cy=Back]').click();
			cy.contains("New test item");
		});
	});

	afterEach(function() {
		window.localStorage.removeItem("uniqueToken")
	});
});
