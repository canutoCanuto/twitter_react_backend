const express = require("express");
const publicRouter = express.Router();
const userController = require("../controllers/userController");

// Rutas del Públicas:
// ... login

//publicRouter.post("/login", userController.verifyLogin);
// ...logout
publicRouter.get("/logout", userController.logout);

// ... registro nuevo usuario

publicRouter.post("/checkin", userController.store);

module.exports = publicRouter;
