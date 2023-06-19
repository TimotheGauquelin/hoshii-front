describe('Guest Page', () => {

    beforeEach(() => {
        cy.getAllLocalStorage().should('be.empty')
        cy.visit('http://localhost:3000/guest')
    })

    it('Visit the guest page', () => {
        cy.get("p#appName").contains('HOSHII')
    })

    it('Visit the register guest page and submit it', () => {
        
        //Fill the form
        cy.get('p')
          .contains('Sign Up')
          .click()
        cy.get('input[name="username"]')
          .type("Test1")
        cy.get('input[name="email"]')
          .type("Test1@test.fr")
        cy.get('input[name="password"]')
          .type("test1")
        cy.get('input[name="password-confirmation"]')
          .type("test1")
        cy.get('form')
          .submit()

        cy.intercept("POST", "http://localhost:5000/api/auth/register", {
            body: {
                username: "Test2"
            }
        })
    })


    it('Login guest page and submit it', () => {
        cy.login()    
    })

})