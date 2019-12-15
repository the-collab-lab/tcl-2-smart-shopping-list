// the function to create a random input
function randomInput() {
  var text = '';
  var letterSelection =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzáéíóúñ.,;:!?"';

  for (var i = 0; i < 10; i++)
    text += letterSelection.charAt(
      Math.floor(Math.random() * letterSelection.length),
    );

  return text;
}

describe('Add Item To List', function() {
  beforeEach(function() {
    window.localStorage.setItem('uniqueToken', 'token1234');
  });

  it('Checks that entered items are added to list', function() {
    cy.visit('/add');
    cy.get('.inputField').type('New Cypress Item');
    cy.get('#addItemButton').click();
  });

  it('Input field accepts input', function() {
    cy.visit('/add');
    cy.get('.inputField')
      .type('watermelon')
      .should('have.value', 'watermelon');
  });

  // This test was not passing, because of a conflict with our new functionality
  // that handles duplicate items. I added a function to generate a random item,
  // instead of "marshmallows" every time, so now the test can work with a new
  // item on every run - Ethan
  it('Resets input field after addItem button click', function() {
    cy.visit('/add');
    cy.get('.inputField').type(randomInput());

    cy.get('#addItemButton').click();

    cy.get('.inputField').should('have.value', '');
  });

  it('Selects correct frequency button', function() {
    cy.visit('/add');
    cy.get('#soonButton').should('have.value', '7');
  });

  it('Checks that the selected frequency button get focused', function() {
    cy.visit('/add');
    cy.get('#soonButton')
      .click({ force: true })
      .focused()
      .should('have.id', 'soonButton');
  });

  it('Checks for alert message when duplicate item is entered', function() {
    cy.visit('/add');
    cy.get('.inputField').type('Cream Cheese');
    cy.get('#addItemButton').click();
    cy.get('.inputField').type('Cream Cheese');
    cy.get('#addItemButton').click();
    expect(cy.contains('Oops!'));
  });
});
