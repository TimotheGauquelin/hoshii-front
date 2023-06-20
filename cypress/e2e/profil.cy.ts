describe('My Profil Page', () => {

    beforeEach(() => {
        cy.login()
        cy.getAllLocalStorage().should('not.be.empty')
        cy.get(`div[data-cy='/user/6426b0556f6e23ea293baa50']`).click()
    })

    it('Check if it is my profil', () => {
        cy.location().should((loc) => {
            expect(loc.host).to.eq('localhost:3000')
            expect(loc.pathname).to.eq('/user/6426b0556f6e23ea293baa50')
            expect(loc.hostname).to.eq('localhost')
            expect(loc.href).to.eq('http://localhost:3000/user/6426b0556f6e23ea293baa50')
        })
    })

    const NEW_LIST_NAME = "Test New List"
    const UPDATED_NEW_LIST_NAME = "Updated Test New List"

    it('Should add a list and check if number of lists is + 1', () => {

        cy.get("div[data-cy='present-list-component'")
        .its('length')
        .then((length) => {
            const LIST_LENGTH = length

            cy.get("div[data-cy='present-list-component'")
              .should('have.length', LIST_LENGTH)

            cy.get(`button[data-cy='add-list-btn']`).click()

            cy.get(`input[data-cy='label-input']`)
              .type(NEW_LIST_NAME)

            cy.get(`button[data-cy='submit-btn']`)
              .click()
    
            cy.get('p[data-cy="list-name"]')
              .contains(NEW_LIST_NAME)
            
            cy.get("div[data-cy='present-list-component']")
              .should('have.length', LIST_LENGTH + 1)
        })
    })

    it('Should add a present and check if number of presents is + 1', () => {

      cy.get("div[data-cy='list-tile']").last().click()

      cy.get("div[data-cy='present-component']").should('not.exist');

      cy.get("button[data-cy='add-present-btn']").click()

      cy.get(`input[data-cy='label-input']`)
        .clear()
        .type("Test")

      cy.get(`input[data-cy='desc-input']`)
        .clear()
        .type("Test")

      cy.get(`input[data-cy='price-input']`)
        .clear()
        .type("10")

      cy.get(`button[data-cy='submit-btn']`)
        .click()

      cy.get("div[data-cy='present-component'")
        .should('have.length', 1)
    
    })

    it('Should delete a present and check if number of presents is 0', () => {

      cy.get("div[data-cy='list-tile']").last().click()

      cy.get("button[data-cy='delete-present-btn']").click()

      cy.get("div[data-cy='present-tile']")
        .should('not.exist')    
    })

    it('Should update a list and check if number of lists is the same', () => {

      cy.get("div[data-cy='present-list-component'")
        .its('length')
        .then((length) => {

            const LIST_LENGTH = length

            cy.get("div[data-cy='present-list-component'")
              .should('have.length', LIST_LENGTH)

            cy.get("div[data-cy='list-tile']")
              .last()
              .click()

            cy.get("button[data-cy='update-list-btn']")
              .click()

            cy.get(`input[data-cy='label-input']`)
              .should('have.value', NEW_LIST_NAME)
              .clear()
              .type(UPDATED_NEW_LIST_NAME)
              .should('have.value', UPDATED_NEW_LIST_NAME)

            cy.get(`button[data-cy='submit-btn']`)
              .click()
    
            cy.get('p[data-cy="list-name"]')
              .contains(UPDATED_NEW_LIST_NAME)

            cy.get("div[data-cy='present-list-component'")
              .should('have.length', LIST_LENGTH)
        })   
    })

    it('Should delete a list and check if number of lists is - 1', () => {

        cy.get("div[data-cy='present-list-component']")
        .its('length')
        .then((length) => {
            const LIST_LENGTH = length

            cy.get("div[data-cy='list-tile']").last().click()

            cy.get("button[data-cy='delete-list-btn']").click()
            
            cy.get("div[data-cy='present-list-component']")
              .should('have.length', LIST_LENGTH  -1)
        })

    })

})

// describe('Another User Page', () => {

//     beforeEach(() => {
//         cy.login()
//         cy.getAllLocalStorage().should('not.be.empty')
//     })

//     it('Check if it is my profil', () => {

//     })
// })