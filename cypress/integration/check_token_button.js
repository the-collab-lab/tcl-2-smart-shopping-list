describe("Checks button", function() {
    it("Checks if the generate token button stores a string in local storage", function() {
        cy.visit("/add")
        cy.get('.tokenButton').click().should(() => {
            expect(localStorage.getItem('uniqueToken')).to.not.eq(null);
        });
    });
});