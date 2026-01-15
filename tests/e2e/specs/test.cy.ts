describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.url().should('include', '/tabs/tab1')
  })
})
describe('Validate wrong credentials', () => {
  it('Enter User Credentials', () =>{
    cy.visit('/tabs/tab1')
    cy.get('ion-input[data-cy="email-input"]').type('shykandev@gmail.com')
    cy.get('ion-input[data-cy="password-input"]').type('5511470315')
    cy.get('ion-button').click({multiple: true})
    cy.url().should('eq', 'http://localhost:8100/tabs/tab1')
    cy.get('ion-content').should('contain', 'Iniciar Sesión')
  })
})
describe('Validate correct credentials', () => {
  it('Enter User Credentials', () =>{
    cy.visit('/tabs/tab1')
    cy.get('ion-input[data-cy="email-input"]').type('shykandev@gmail.com')
    cy.get('ion-input[data-cy="password-input"]').type('asdasdasdA')
    cy.get('ion-button').click({multiple: true})
    cy.url().should('eq', 'http://localhost:8100/tabs/expert-list-modern')
    cy.get('ion-content').should('contain', 'Áreas de Especialización')
    //get the Servicios Web card and click on it
    cy.get('div[data-cy="expert-card-Servicios Web"]').click()
    cy.url().should('eq', 'http://localhost:8100/tabs/expert-list-modern')
    cy.get('ion-content').should('contain', 'Servicios Web')
    cy.get('button[data-cy="view-schedule-button"]').click()
    cy.url().should('eq', 'http://localhost:8100/expert-info-fixed')
    

  })
})
