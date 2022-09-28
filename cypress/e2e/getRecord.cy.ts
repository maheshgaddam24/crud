describe('CURD Automation', function () {
    it('Get Record', () => {
      cy.visit('http://localhost:4200/create-employee')
  
      cy.get('.btn-block1').click()
  
      cy.url().should('contain', 'http://localhost:4200/employees-list')

      cy.get('.name')
        .should('contain','Mahesh')

      cy.get('.email')
        .should('contain','maheshgaddam@gmail.com')
  
      cy.get('.phone')
        .should('contain','8143547013')
  
    })
  
  })
  