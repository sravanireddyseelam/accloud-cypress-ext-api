describe('Get a list of patients', () => {
    it('Get a list of patients', () => {
        cy.request({
            method: 'GET',
            url: 'ext/api/v2/patients/clients',
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
        }}).then((response) => {
            expect(response.status).to.eql(200);
            expect(response.body).to.have.property('items');
            expect(response.body).to.have.property('count');
        });
    });
});
