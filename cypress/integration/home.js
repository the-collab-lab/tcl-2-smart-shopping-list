describe("Join an existing list", function() {
  it("Adds token to local storage on submit", function() {
    cy.visit("/");
		cy.get(".inputField").type("Token1234");
		cy.get(".joinListButton").click().should(() => {
			expect(localStorage.getItem("uniqueToken")).to.eq("Token1234")
		});
  });
});
