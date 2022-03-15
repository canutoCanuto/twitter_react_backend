const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  User.collection.drop();
  for (let i = 0; i < 50; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 123,
      description: faker.lorem.sentence(1),
      avatar: faker.image.imageUrl(),
      tweets: [],
      following: [],
      followers: [],
    });
  }

  await User.create(users);
  console.log("[Database] Se corrió el seeder de Usuarios.");
};
