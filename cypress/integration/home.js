describe("Join an existing list", function() {
  it("Adds token to local storage on submit", function() {
    cy.visit("/");
		cy.get(".inputField").type("token1234");
		cy.get(".joinListButton").click().should(() => {
			expect(localStorage.getItem("uniqueToken")).to.eq("token1234")
		});
	});
	
	it("Alert pops up if token does not exist", function () {
		// let alerted = '';
		// cy.on('window:alert', msg => alerted = msg);
		// cy.visit("/");
		// cy.get(".inputField").type("token5678");
		// cy.get(".joinListButton").click()
		// 	.then(() => {
		// 		expect(alerted).to.eq("Enter a valid share code and try again.");
		// 	})

		const stub = cy.stub()  
		cy.on ('window:alert', stub)
		cy.visit("/");
		cy.get(".inputField").type("token5678");
		cy.get(".joinListButton").click()
    .then(() => {
      expect(stub.getCall(0)).to.be.called      
    })
	})
});

