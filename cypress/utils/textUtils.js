export function validateText(expectedMessage) {
    cy.contains(`${expectedMessage}`)
      .should('be.visible')
      .and('contain.text', expectedMessage);
}
