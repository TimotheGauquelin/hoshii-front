/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add("login", () => {
    
    cy.visit('http://localhost:3000/guest')
    cy.getAllLocalStorage().should('be.empty')

    //Remplis les champs
    cy.get('input')
      .should('have.length', 2)
    cy.get('input[name="username"]')
      .type("Test")
    cy.get('input[name="password"]')
      .type("test")
    cy.get('form')
      .submit()

    //Si succès, envoie vers /home
    cy.url().should('contain', '/home')
    cy.getAllLocalStorage().should('not.be.empty')
})
