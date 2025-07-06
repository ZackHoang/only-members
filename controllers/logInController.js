exports.displayLogInForm = (req, res, next) => {
    // console.log(req.session);
    res.render("log-in");
    delete req.session.messages;
}