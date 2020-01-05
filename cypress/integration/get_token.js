describe("Get token functionality", function() {
  it("Shows the user the list page if they have a token stored", function() {
    window.localStorage.setItem("uniqueToken", "token1234")
    cy.visit("/");
    expect(cy.contains("List"));
  });

  it("Shows the user the generate token page if they don't have a token stored", function() {
    window.localStorage.removeItem("uniqueToken")
    if (cy.visit("").contains("Start a New List")) {
      expect(localStorage.getItem("uniqueToken")).to.eq(null);
    }
  });

  it("Clicking generate token button stores a string in local storage", function() {
    cy.visit("")
    cy.get('#tokenButton').click().should(() => {
        expect(localStorage.getItem('uniqueToken')).to.not.eq(null);
    });
  });
});
