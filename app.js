require("dotenv").config();
const express = require("express"); 
const app = express();
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const signUpRouter = require("./routers/signUpRouter");
const logInRouter = require("./routers/logInRouter");
const port = process.env.PORT || 3000;
const pool = require("./db/pool");
const authRouter = require("./routers/authRouter");
const homeRouter = require("./routers/homeRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        // Insert connect-pg-simple options here
        pool: pool, 
        createTableIfMissing: true
    }),
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.errors;
    res.locals.session = req.session;       
    next();
})

app.use("/", logInRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", authRouter);
app.use("/home", homeRouter);

app.listen(port, () => {
    console.log("Listening");
})