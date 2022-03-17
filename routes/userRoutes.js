const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("express-jwt");
const tokenExist = require("../middlewares/tokenExist");

// Rutas del Públicas:
//*****    Login           ************ */
userRouter.post("/users/login", userController.getToken);
//Midlleware para rutas privadas
userRouter.use(checkJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] }));
//Middleware para ver si existe token en array de user
userRouter.use(tokenExist);
//*****    ruta de user profile           ************ */
userRouter.get("/users/:username", userController.show);
//*****    ruta crear usuario             ************ */
userRouter.post("/users", userController.store);
//*****    ruta de followings - followers ************ */
userRouter.post("/users/:id/follow", userController.toggleFollowings);
//*****    logout           ************ */
userRouter.post("/users/logout", userController.deleteToken);

module.exports = userRouter;
