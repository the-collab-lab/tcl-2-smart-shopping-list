describe("Join an existing list", function() {
  it("Adds token to local storage on submit", function() {
    cy.visit("/");
		cy.get(".inputField").type("Token1234");
		cy.get(".joinListButton").click().should(() => {
			expect(localStorage.getItem("uniqueToken")).to.eq("Token1234")
		});
	});
	
	it("Alert pops up if token does not exist", function () {
		let alerted = '';
		cy.on('window:alert', msg => alerted = msg);
		cy.visit("/");
		cy.get(".inputField").type("Token5678");
		cy.get(".joinListButton").click()
			.then(() => {
				expect(alerted).to.match(/Enter a valid share code and try again/);
			})
	}
	)
});

