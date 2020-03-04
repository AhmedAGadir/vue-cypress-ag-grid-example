function assertCellValueInFirstRow(colId, value) {
    cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="${colId}"]`)
        .then(cell => {
            expect(cell).to.have.text(value);
        });
}

describe('My ag-Grid tests', () => {
    //  basic tests, filtering, sorting, checking content of grid data/rows
    beforeEach(() => {
        // we don't need to ensure that the grid API is set before running
        // our tests because Cypress will repeatedly run queries and assertions
        // until either an element is found or a timeout is reached (4000ms by default)
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
        cy.get('.ag-header-cell')
            .first()
            .click()
            // .wait(500)
            .then(() => {
                cy.get('.ag-center-cols-container .ag-row')
                    .then(rows => {
                        return rows.sort((a, b) => {
                            return +a.getAttribute('row-index') - +b.getAttribute('row-index');
                        })
                    })
                    .then(sortedRows => {
                        const EXPECTED_ORDER = ['Ford', 'Porsche', 'Toyota'];
                        sortedRows.each((ind, row) => {
                            let makeCell = row.querySelector('[col-id="make"]');
                            expect(makeCell).to.have.text(EXPECTED_ORDER[ind]);
                        })
                    })
            })
    });
    it('filters for Toyota', () => {
        cy.get('.ag-icon-menu')
            .first()
            .click()

        cy.get('.ag-tab')
            .then(tabs => tabs[1])
            .click()

        cy.get('.ag-filter-filter')
            .type('Toyota{enter}')

        cy.get('.ag-center-cols-container .ag-row')
            .find(`[col-id="make"]`)
            .then(cells => {
                cells.each((_, cell) => {
                    expect(cell).to.have.text('Toyota');
                });
            })
    });
})
