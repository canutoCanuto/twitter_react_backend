const { faker } = require("@faker-js/faker");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  User.collection.drop();
  for (let i = 0; i < 150; i++) {
    const [firstname] = removeAccents(faker.name.firstName()).split(" ");
    const [lastname] = removeAccents(faker.name.lastName()).split(" ");
    const [, email] = faker.internet.email().split("@");

    users.push({
      firstname,
      lastname,
      username: firstname + lastname + Math.round(Math.random() * 100),
      email: firstname + "@" + email,
      password: 123,
      description: faker.lorem.sentence(1),
      avatar: `${faker.image.imageUrl()}?random=${Math.round(Math.random() * 1000)}`,
      tweets: [],
      following: [],
      followers: [],
    });
  }

  await User.create(users);
  console.log("[Database] Se corrió el seeder de Usuarios.");
};
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
