const { Router } = require("express");
const { displayError } = require("../controllers/errorController");
const errorRouter = Router(); 

errorRouter.get("/", displayError);

module.exports = errorRouter;