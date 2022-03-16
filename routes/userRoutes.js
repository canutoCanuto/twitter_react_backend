const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");
const checkJwt = require("express-jwt");

// Rutas del Públicas:
//*****    Login           ************ */
userRouter.post("/users/login", tokenController.getToken);
//Midlleware para rutas privadas
userRouter.use(checkJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] }));
//*****    ruta de user profile           ************ */
userRouter.get("/users/:username", userController.show);
//*****    ruta crear usuario             ************ */
userRouter.post("/users", userController.store);
//*****    ruta de followings - followers ************ */
userRouter.post("/users/:id/follow", userController.toggleFollowings);
//*****    logout           ************ */
userRouter.post("/users/logout", tokenController.deleteToken);

module.exports = userRouter;
