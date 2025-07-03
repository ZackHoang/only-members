const { Router } = require("express"); 
const { displaySignUpForm, signUp } = require("../controllers/signUpController");
const signUpRouter = Router();

signUpRouter.get("/", displaySignUpForm);
signUpRouter.post("/", signUp);

module.exports = signUpRouter;