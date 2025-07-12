const { Router } = require("express");
const { displayHome, submitPost } = require("../controllers/homeController");
const homeRouter = Router(); 

homeRouter.get("/", displayHome);
homeRouter.post("/", submitPost);

module.exports = homeRouter;