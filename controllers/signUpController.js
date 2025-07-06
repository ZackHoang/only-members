const bcrypt = require("bcryptjs");
const { insertUserSignUp } = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "Must contains only letters";
const emptyErr = "cannot be empty"

exports.displaySignUpForm = (req, res, next) => {
    res.render("sign-up");
}

const validateUser = [
    body("firstName")
        .trim()
        .isAlpha()
        .withMessage(`First Name ${alphaErr}`)
        .notEmpty()
        .withMessage(`First name ${emptyErr}`), 
    body("lastName")
        .trim()
        .isAlpha()
        .withMessage(`Last Name ${alphaErr}`)
        .notEmpty()
        .withMessage(`Last Name ${emptyErr}`),
    body("username")
        .trim()
        .notEmpty()
        .withMessage(`Username ${emptyErr}`),
    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match")  
            } else {
                return true;
            };
        })
]

exports.signUp = [
    validateUser,
    async (req, res, next) => {
        // console.log(req.body);
        // console.log(req.body.isAdmin); 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign-up", {
                errors: errors.array()
            })
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await insertUserSignUp(req.body.firstName, req.body.lastName, req.body.username, hashedPassword, req.body.isAdmin);
            res.redirect("/")
        } catch(err) {
            return next(err);
        }
    }
]