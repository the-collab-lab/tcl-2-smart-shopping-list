describe("Show list of items", function() {
  describe("Empty List", function() {
    beforeEach(function() {
      window.localStorage.setItem("uniqueToken", "empty_test_token");
    });

    it("Checks for the 'add first item' button on empty list", function() {
      cy.visit("/list");
      cy.get("#emptyListAddItem").click();
    });
  });

  describe("List with Items", function() {
    beforeEach(function() {
      window.localStorage.setItem("uniqueToken", "token1234");
    });

    it("User sees list after adding an item", function() {
      cy.visit("/add");
      cy.get(".inputField").type("New test item");
      cy.get("#addItemButton").click();
      cy.get("[data-cy=Back]").click();
      cy.contains("New test item");
    });
    it("Checks that item special characters & capitalization are not removed when rendered in list", function() {
      cy.visit("/add");
      cy.get(".inputField").type("Cream!.Cheese");
      cy.get("#addItemButton").click();
      cy.contains("List").click();
      expect(cy.contains("Cream!.Cheese"));
    });
  });

  afterEach(function() {
    window.localStorage.removeItem("uniqueToken");
  });
});
