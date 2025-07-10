exports.displayLogInForm = (req, res, next) => {
    // console.log(req.session);
    // console.log(req.user);
    res.render("log-in");
    delete req.session.messages;
}