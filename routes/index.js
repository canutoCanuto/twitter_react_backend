const publicRoutes = require("./publicRoutes");
const userRoutes = require("./userRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use(publicRoutes);
  app.use(userRoutes);
};
