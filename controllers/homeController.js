const { body, validationResult } = require("express-validator");
const { getAllPosts, addPost } = require("../db/queries");

exports.displayHome = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render("home", {posts: await getAllPosts()});
    } else {
        res.status(401).redirect("/error");
    }
}

const validatePost = [body("post").notEmpty().withMessage("Post must not be empty.")];

exports.submitPost =[
    validatePost, 
    async (req, res, next) => {
        const error = validationResult(req); 
        console.log(error);
        if (!error.isEmpty()) {
            return res.status(400).render("home", {
                posts: await getAllPosts(),
                error: error.errors[0].msg
            });
        }
        await addPost(req.user.username, req.body.post, new Date());
        res.redirect("/home");
    }
]