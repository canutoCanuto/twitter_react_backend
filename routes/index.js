const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use(publicRoutes);
  app.use(adminRoutes);
};
