const express = require("express");
const adminRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const userController = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");

adminRouter.get("/home", isAuth, tweetController.index);
//adminRouter.get("/home", tweetController.index);
adminRouter.get("/:username", userController.show);

//*****   ruta de Likes ***************** */
adminRouter.get("/like/:id", tweetController.likes);

//*****   ruta delete tweet ************* */
adminRouter.get("/tweet/:id", tweetController.destroy);

//*****    ruta de following ************ */
adminRouter.get("/following/:id", userController.toggleFollowings);

module.exports = adminRouter;
