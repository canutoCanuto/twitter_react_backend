const express = require("express");
const userRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const userController = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");

userRouter.get("/home", isAuth, tweetController.index);
//adminRouter.get("/home", tweetController.index);
userRouter.get("/:username", userController.show);

//*****   ruta de Likes ***************** */
userRouter.get("/like/:id", tweetController.likes);

//*****   ruta delete tweet ************* */
userRouter.get("/tweet/:id", tweetController.destroy);

//*****    ruta de following ************ */
userRouter.get("/following/:id", userController.toggleFollowings);

module.exports = userRouter;
