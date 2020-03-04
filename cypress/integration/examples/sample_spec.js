describe('My first test', function () {
    it('Does not do much', function () {
        // Arrange - setup initial app state
        // - visit a page
        // - query to find an element
        // Act - take an action
        // - interact with that element
        // Assert - make an assertion
        // - make an assertion about page content
        expect(true).to.equal(true);
    });
    it('gets,types and asserts', function () {
        cy.visit('https://example.cypress.io');
        cy.contains('type').click();

        cy.url()
            .should('include', '/commands/actions');

        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com');
    });
})
