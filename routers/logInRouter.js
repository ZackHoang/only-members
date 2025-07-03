const { Router } = require("express");
const { displayLogInForm } = require("../controllers/logInController");
const logInRouter = Router();

logInRouter.get("/", displayLogInForm);

module.exports = logInRouter;