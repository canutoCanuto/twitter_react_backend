const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");

//*****    ruta para home *************** */
tweetRouter.get("/tweets", tweetController.index);

//******    ruta crear tweet ************ */
tweetController.post("/tweets/:id", tweetController.store);

//*****   ruta de Likes ***************** */
tweetRouter.post("/tweets/:id/likes", tweetController.likes);

//*****   ruta delete tweet ************* */
tweetRouter.delete("/tweets/:id", tweetController.destroy);

module.exports = tweetRouter;
