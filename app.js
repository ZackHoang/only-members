require("dotenv").config();
const express = require("express"); 
const app = express();
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const signUpRouter = require("./routers/signUpRouter");
const logInRouter = require("./routers/logInRouter");
const { searchUser, searchUserID } = require("./db/queries");
const port = process.env.PORT || 3000;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy(async (userName, password, done) => {
        try {
            const user = await searchUser(userName);
            console.log(user);

            if (!user) {
                return done(null, false, { message: "Incorrect username and/or password" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect username and/or password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);   
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await searchUserID(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.use("/", logInRouter);
app.use("/sign-up", signUpRouter);
app.get("/home", (req, res) => {res.render("home")});
app.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/"
    })
);

app.listen(port, () => {
    console.log("Listening");
})