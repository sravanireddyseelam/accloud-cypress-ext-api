const createPatientFixture = require('../../fixtures/createPatient.json');
const updatePatientFixture = require('../../fixtures/updatePatient.json');

describe('Create a new patient', () => {
    it('Creates a new patient', () => {
        var patientId = patientId
        // Creates a new patient using POST /clients Ext API
        cy.request({
            method: 'POST',
            url: 'ext/api/v2/patients/clients',
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            },
            body: createPatientFixture 
        }).then((patientCreationResponse) => {
            expect(patientCreationResponse.status).to.eql(201);
            expect(patientCreationResponse.body).has.property('id');
        }).then((patientCreationResponse) => {
            var patientId = patientCreationResponse.body.id;
            cy.log("patient_id is " +  patientId);
            var patientId = patientCreationResponse.body.id;
            // Fetches the newly created patient using GET /clients/{client_id} Ext API
            cy.request({
                method: 'GET',
                url: 'ext/api/v2/patients/clients/'+patientId,
                auth: {
                    username: Cypress.env('username'),
                    password: Cypress.env('password')
                },
            }).then((patientResponse) => {
                expect(patientResponse.status).to.eql(200);
                expect(patientResponse.body).has.property('id').to.eql(patientId);
                expect(patientResponse.body).has.property('external_id');
            
            }).then((patientResponse) => {
                var patientExternalId = patientResponse.body.external_id;
                cy.log("patient_id is " +  patientExternalId);
            }).then((patientResponse) => {

                var patientId = patientResponse.body.id;

                // Updates the newly created patient using PUT /clients/{client_id} Ext API
                cy.request({
                    method: 'PUT',
                    url: `ext/api/v2/patients/clients/`+patientId,
                    auth: {
                        username: Cypress.env('username'),
                        password: Cypress.env('password')

                    },
                    body: updatePatientFixture
                }).then((patientUpdateResponse) => {
                    expect(patientUpdateResponse.status).to.eql(200)
                    expect(patientUpdateResponse.body).has.property('id').to.eql(patientId)
                    expect(patientUpdateResponse.body).has.property('external_id').to.eql(updatePatientFixture.external_id)
                });
            });
        });
    });
});
