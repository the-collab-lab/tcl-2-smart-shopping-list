
describe("Join an existing list", function() {
  it("Adds token to local storage on submit", function() {
    cy.visit("/");
		cy.get(".inputField").type("token1234");
		cy.get(".joinListButton").click().should(() => {
			expect(localStorage.getItem("uniqueToken")).to.eq("token1234")
		});
	});
	
	it("Alert pops up if token does not exist", function () {
		cy.visit("/");
		cy.get(".inputField").type("token5678");
		cy.get(".joinListButton").click();
		cy.on('window:alert', str => {
			expect(str).to.equal("Enter a valid share code and try again.")
		});
	})
});