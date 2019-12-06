describe("Join an existing list", function() {
  it("Adds token to local storage on submit", function() {
    cy.visit("/join");
		cy.get(".inputField").type("token1234");
		cy.get(".joinListButton").click().should(() => {
			expect(localStorage.getItem("uniqueToken")).to.eq("token1234")
		});
	});

	it("Redirects to list page on valid token submit", function() {
		cy.visit("/");
		cy.get(".tokenButton").click();
    cy.visit("/join");
		cy.get(".inputField").type("token1234");
		cy.get(".joinListButton").click()
		cy.url().should('eq', Cypress.config().baseUrl + '/list')
	});
	
	it("Alert pops up if token does not exist", function () {
		cy.visit("/join");
		cy.get(".inputField").type("token5678");
		cy.get(".joinListButton").click();
		cy.on('window:alert', str => {
			expect(str).to.equal("Enter a valid share code and try again.")
		});
	});

	it("Goes back to landing page by clicking on 'Start a new list'", function() {
		cy.visit("/join");
		cy.get(".newListLink").click();
		cy.url().should('eq', Cypress.config().baseUrl + '/');
	});
});
