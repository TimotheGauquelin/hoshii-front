describe('Home Page', () => {

    beforeEach(() => {
        cy.login()
        cy.getAllLocalStorage().should('not.be.empty')
    })

    it('Go to Friends page', ()=> {
        cy.get("li[data-cy='/friends']").click()
    })

})