const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use(userRoutes);
  app.use(tweetRoutes);
};
