describe('Testing visual suggestions', () => {
    it('Should suggest 3 string', () => {
        cy.visit('localhost:3000');
        const stringToInsert = ['red', 'redux', 'reducer', 'redmond'];
        for (let i = 0; i < stringToInsert.length; i++) {
            cy.get('.input-string')
              .type(stringToInsert[i]);

            cy.get('.insert-button').click();
        }
        cy.get('.search-string')
          .type('red');

        cy.get('.suggestions__element')
          .should('have.length', 3);
    });
});
