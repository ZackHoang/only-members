const { Router } = require("express");
const { logout } = require("../controllers/logoutController");
const logoutRouter = Router();

logoutRouter.get("/", logout);

module.exports = logoutRouter;