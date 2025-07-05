const { Router } = require("express");
const { authenticate } = require("../controllers/authController");
const authRouter = Router();

authRouter.post("/", authenticate);

module.exports = authRouter;