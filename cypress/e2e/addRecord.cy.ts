describe('CURD Automation', function () {
  it('Add Record', () => {

    cy.visit('http://localhost:4200/create-employee')

    cy.get('#name')
      .type('Mahesh')

    cy.get('#email')
      .type('maheshgaddam@gmail.com')
    
    cy.get('#phone')
      .type('8143547013')


    cy.get('.btn-block').click()


    cy.url().should('contain', 'http://localhost:4200/employees-list')

  })
  it('Checking Record', () => {

    cy.visit('http://localhost:4200/employees-list')

    cy.get('.name')
      .should('contain','Mahesh')

    cy.get('.email')
    .should('contain','maheshgaddam@gmail.com')
  
    cy.get('.phone')
    .should('contain','8143547013')

  })

})
