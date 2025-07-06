exports.displayHome = (req, res, next) => {
    console.log(req.user);
    res.render("home");
}