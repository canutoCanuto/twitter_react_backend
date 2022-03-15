const express = require("express");
const publicRouter = express.Router();
const userController = require("../controllers/userController");

// Rutas del Públicas:
// ... login
publicRouter.get("/login", userController.showLogin);
publicRouter.post("/login", userController.verifyLogin);
// ...logout
publicRouter.get("/logout", userController.logout);

// ... registro nuevo usuario
publicRouter.get("/checkin", userController.create);
publicRouter.post("/checkin", userController.store);

publicRouter.get("/", userController.showstart);

module.exports = publicRouter;
