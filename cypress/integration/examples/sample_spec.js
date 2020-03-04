// describe('My first test', function () {
//     it('Does not do much', function () {
//         // Arrange - setup initial app state
//         // - visit a page
//         // - query to find an element
//         // Act - take an action
//         // - interact with that element
//         // Assert - make an assertion
//         // - make an assertion about page content
//         expect(true).to.equal(true);
//     });
//     it('gets,types and asserts', function () {
//         cy.visit('https://example.cypress.io');
//         cy.contains('type').click();

//         cy.url()
//             .should('include', '/commands/actions');

//         cy.get('.action-email')
//             .type('fake@email.com')
//             .should('have.value', 'fake@email.com');
//     });
// })

function assertCellValueInFirstRow(colId, value) {
    cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="${colId}"]`)
        .then(cell => {
            expect(cell).to.have.text(value);
        });
}

describe('My ag-Grid tests', () => {
    //  basic tests, filtering, sorting, checking content 
    // of grid data/rows
    beforeEach(() => {
        // we don't need to ensure that the grid API is set before running
        // our tests because Cypress will repeatedly run queries and assertions
        // until either the element is found or a timeout is reached (4000ms by default)
        // see https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#1-The-element-is-found
        cy.visit('http://localhost:8082');
    });
    it('renders the first row', () => {
        // { make: "Toyota", model: "Celica", price: 35000 },
        assertCellValueInFirstRow('make', 'Toyota');
        assertCellValueInFirstRow('model', 'Celica');
        assertCellValueInFirstRow('price', '35000');
    });
    it('sorts the data', () => {

    })
    it('filters for Toyota', () => {

    });
})
