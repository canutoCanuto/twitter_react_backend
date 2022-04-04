const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const _ = require("lodash");

faker.locale = "es";

module.exports = async () => {
  try {
    const tweets = [];
    Tweet.collection.drop();
    const usersid = await User.find({}, "_id");
    for (let i = 0; i < 50; i++) {
      const randomUser = _.sample(usersid);
      const newtweet = new Tweet({
        content: faker.lorem.sentence(10),
        author: randomUser,
        likes: _.sampleSize(usersid, Math.random() * (usersid.length - 1) + 1),
      });

      await User.findByIdAndUpdate(randomUser, { $push: { tweets: newtweet } });
      newtweet.save();
    }

    // await Tweet.create(tweets);
  } catch (error) {
    console.log(error.message);
  }

  console.log("[Database] Se corrió el seeder de Tweets.");
};
