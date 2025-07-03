const bcrypt = require("bcryptjs");
const { insertUserSignUp } = require("../db/queries");

exports.displaySignUpForm = (req, res, next) => {
    res.render("sign-up");
}

exports.signUp = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body.isAdmin); 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await insertUserSignUp(req.body.firstName, req.body.lastName, req.body.userName, hashedPassword, req.body.isAdmin);
        res.redirect("/")
    } catch(err) {
        return next(err);
    }
}