exports.displayHome = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render("home");
    } else {
        res.status(401).redirect("/error");
    }
}