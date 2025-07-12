const { body, validationResult } = require("express-validator");
const { updateMembership } = require("../db/queries");

exports.displayMemberForm = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render("member");
    } else {
        res.status(401).redirect("/error");
    }
}

const validateMemberKeyword = [
    body("member")
        .equals("IAMAMEMBER")
        .withMessage("Keyword does not match. Please try again.")
]

exports.validateMember = [
    validateMemberKeyword,
    async (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("member", {
                error: error.errors[0].msg
            });
        }
        await updateMembership(req.user.id);
        res.redirect("/home");
    }
]
