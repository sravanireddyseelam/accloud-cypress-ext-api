const { externalId, patient } = require("../../store/store");

describe("Create a new patient", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    it("Creates a new patient", () => {
        // Creates a new patient using POST /clients Ext API
        cy.request({
            method: "POST",
            url: "ext/api/v2/patients/clients",
            auth: {
                username,
                password
            },
            body: patient 
        }).then((patientCreationResponse) => {
            expect(patientCreationResponse.status).to.eql(201);
            expect(patientCreationResponse.body).has.property("id");
        }).then((patientCreationResponse) => {
            let patientId = patientCreationResponse.body.id;
            cy.log(`patient_id is ${   patientId}`);
            patientId = patientCreationResponse.body.id;
            // Fetches the newly created patient using GET /clients/{client_id} Ext API
            cy.request({
                method: "GET",
                url: `ext/api/v2/patients/clients/${patientId}`,
                auth: {
                    username,
                    password
                },
            }).then((patientResponse) => {
                expect(patientResponse.status).to.eql(200);
                expect(patientResponse.body).has.property("id").to.eql(patientId);
                expect(patientResponse.body).has.property("external_id");

            }).then((patientResponse) => {
                let patientExternalId = patientResponse.body.external_id;
                cy.log(`patient_id is ${   patientExternalId}`);
            }).then((patientResponse) => {

                let patientId = patientResponse.body.id;

                // Updates the newly created patient using PUT /clients/{client_id} Ext API
                cy.request({
                    method: "PUT",
                    url: `ext/api/v2/patients/clients/${patientId}`,
                    auth: {
                        username,
                        password
                    },
                    body: externalId
                }).then((patientUpdateResponse) => {
                    expect(patientUpdateResponse.status).to.eql(200);
                    expect(patientUpdateResponse.body).has.property("id").to.eql(patientId);
                    expect(patientUpdateResponse.body).has.property("external_id").to.eql(externalId.external_id);
                });
            });
        });
    });
});
