describe('My Profil Page', () => {

    beforeEach(() => {
        cy.login()
        cy.getAllLocalStorage().should('not.be.empty')
        cy.get(`li[data-cy='/user/6426b0556f6e23ea293baa50']`).click()
    })

    it('Check if it is my profil', () => {
        cy.location().should((loc) => {
            expect(loc.host).to.eq('localhost:3000')
            expect(loc.pathname).to.eq('/user/6426b0556f6e23ea293baa50')
            expect(loc.hostname).to.eq('localhost')
            expect(loc.href).to.eq('http://localhost:3000/user/6426b0556f6e23ea293baa50')
        })
    })

    const NEW_LIST = "Test New List"

    it('Should add a list', () => {

        cy.get("div[data-cy='present-list-component'")
        .its('length')
        .then((length) => {
            const LIST_LENGTH = length

            cy.get("div[data-cy='present-list-component'")
              .should('have.length', LIST_LENGTH)

            cy.get(`button[data-cy='add-list-btn']`).click()

            cy.get(`input[data-cy='label']`)
              .type(NEW_LIST)

            cy.get(`button[data-cy='submit-btn']`)
              .click()
    
            cy.get('p[data-cy="list-name"]')
              .contains(NEW_LIST)
            
            cy.get("div[data-cy='present-list-component']")
              .should('have.length', LIST_LENGTH + 1)
        })
    })

    it('Should delete a list', () => {

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