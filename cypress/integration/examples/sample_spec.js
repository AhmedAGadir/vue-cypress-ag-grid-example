import { AgGridVue } from 'ag-grid-vue';

// cypress is bundled with mocha and chai

let component = null;
let agGridVue = null;

const ensureGridApiHasBeenSet = (component) => {
    return new Promise(function (resolve, reject) {
        (function waitForGridReady() {

            // we need to wait for the gridReady event before we can start interacting with the grid
            // in this case we're looking at the api property in our App component, but it could be anything (ie a boolean flag)
            if (component.vm.gridApi) {

                // once our condition has been met we can start the tests
                return resolve();
            }
            console.log(component.vm.gridApi)

            // not set - wait a bit longer
            setTimeout(waitForGridReady, 10);
        })();
    });
};

describe('My ag-Grid test', () => {
    //  basic tests, filtering, sorting, checking content 
    // of grid data/rows

    beforeEach(done => {

        component = mount(App);
        agGridVue = component.vm;

        // don't start our tests until the grid is ready
        // it doesn't take long for the grid to initialise, but it is some finite amount of time after the component is ready
        ensureGridApiHasBeenSet(component).then(() => done());

        cy.visit('http://localhost:8082');
        cy.find(AgGridVue).instance()
        ensureGridApiHasBeenSet().then(() => done());
    })
    it('renders the first row', () => {
        // { make: "Toyota", model: "Celica", price: 35000 },

    });
    it('sorts the data', () => {

    })
    it('filters for Toyota', () => {

    });
})


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