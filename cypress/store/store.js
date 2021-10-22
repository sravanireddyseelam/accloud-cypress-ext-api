const faker = require('faker');

const employee = {
  demographics: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    salutation: "Mr.",
    gender: 'M',
  },
  max_weekly_capacity: "24.5",
  min_weekly_capacity: "10",
  payroll_number: "A123",
  status: "active",
  username: faker.internet.userName()
};

const externalId = {
  external_id: `external_id_${faker.random.number()}`,
};

const patient = {
  demographics: {
      first_name: faker.name.firstName(),
      gender: 'M',
      last_name: faker.name.lastName(),
  },
  timezone: faker.address.timezone
};

export default { employee, externalId, patient };
