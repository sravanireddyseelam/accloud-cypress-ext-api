const { employee, externalId, randomID } = require('../../store/store');

describe('Create a new employee', () => {
    it('Creates a new employee', () => {
        var employeeId = employeeId
        // Creates a new employee profile using POST /employees Ext API
        cy.api({
            method: 'POST',
            url: 'ext/api/v2/employees/employees',
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            },
            body: employee
        }).then((employeeCreationResponse) =>{
            expect(employeeCreationResponse.status).to.eql(201);
            expect(employeeCreationResponse.body).has.property('id');
            
        }).then((employeeCreationResponse) => {
            var employeeId = employeeCreationResponse.body.id
            cy.log("employee_id is " +  employeeId) 
            // Fetches the newly created employee using GET /employees/{employee_id} Ext API
            cy.api({
                method: 'GET',
                url: 'ext/api/v2/employees/employees/'+ employeeId,
                auth: {
                    username: Cypress.env('username'),
                    password: Cypress.env('password')

                },
    
            }).then((employeeGetResponse) => {
                expect(employeeGetResponse.status).to.eql(200);
                expect(employeeGetResponse.body).has.property('id').to.eql(employeeId);
                expect(employeeGetResponse.body).has.property('external_id');
            
            }).then((employeeGetResponse) => {
                var employeeExternalId = employeeGetResponse.body.external_id;
                cy.log("employee_id is " +  employeeExternalId);
            }).then((employeeGetResponse) => {

                var employeeId = employeeGetResponse.body.id;

                // Updates the newly created employee using PUT /employees/{employee_id} Ext API
                cy.api({
                    method: 'PUT',
                    url: `ext/api/v2/employees/employees/`+ employeeId,
                    auth: {
                        username: Cypress.env('username'),
                        password: Cypress.env('password')

                    },
                    body: externalId

                }).then((employeeUpdateResponse) => {
                    expect(employeeUpdateResponse.status).to.eql(200);
                    expect(employeeUpdateResponse.body).has.property('id').to.eql(employeeId);
                    expect(employeeUpdateResponse.body).has.property('external_id').to.eq(Object.values(externalId)[0]);
                });
            });
        });
    });
});
