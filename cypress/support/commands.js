// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { db } from '../../src/lib/firebase';

Cypress.Commands.add("addItem", (token, itemID, dateOfPurchase) => {
	db.collection('lists').doc(token).set({ items: '' });
	db.collection('lists').doc(token).collection('items').doc(itemID)
		.set({
			id: itemID,
			name: itemID,
			numberOfDays: 14,
			dateOfPurchase: dateOfPurchase,
			numberOfPurchases: 1,
	})
});

Cypress.Commands.add("deleteItem", (token, itemID) => { 
	db.collection("lists").doc(token).collection('items').doc(itemID).delete();
 })
