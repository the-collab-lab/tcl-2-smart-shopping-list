describe("Which view to land on", function() {
  it("Shows the user the generate token page if they don't have a token stored", function() {
    if (cy.visit("/list").contains("Get Token")) {
      expect(localStorage.getItem("uniqueToken")).to.eq(null);
    }

    // if (cy.visit('/list').click('button')) {
    //     expect(localStorage.getItem('uniqueToken')).to.not.eq(null);
    // }
  });
});

// How to also check if the other view has a token? I can't figure out how to get
// cypress to load the new page with a token after pressing the button...
