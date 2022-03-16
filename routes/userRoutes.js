const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

//*****    ruta de user profile           ************ */
userRouter.get("/users/:username", userController.show);

//*****    ruta crear usuario             ************ */
userRouter.post("/users", userController.store);

//*****    ruta de followings - followers ************ */
userRouter.post("/users/:id/follow", userController.toggleFollowings);

module.exports = userRouter;
