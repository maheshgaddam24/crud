describe('CURD Automation', function () {
    it('Delete Record', () => {
        cy.visit('http://localhost:4200/employees-list')

        cy.get('.delete').click()

        cy.url().should('contain', 'http://localhost:4200/employees-list')

    })

})
