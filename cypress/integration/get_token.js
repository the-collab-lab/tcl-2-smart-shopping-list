describe("Checking functionality of Get Token", function() {
    it("Shows the user the Main page if they have a token stored", function() {
      cy.visit("/");
      cy.get(".tokenButton").click();
      expect(cy.contains("List"));
    });

    it("Shows the user the generate token page if they don't have a token stored", function() {
        if (cy.visit("").contains("Get Token")) {
          expect(localStorage.getItem("uniqueToken")).to.eq(null);
        }
      });

      it("Checks if the generate token button stores a string in local storage", function() {
        cy.visit("")
        cy.get('.tokenButton').click().should(() => {
            expect(localStorage.getItem('uniqueToken')).to.not.eq(null);
        });
    });
  });
  