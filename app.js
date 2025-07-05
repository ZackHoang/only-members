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
const pool = require("./db/pool");
const authRouter = require("./routers/authRouter");

// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//         try {
//             const user = await searchUser(username);    
//             // console.log(user);
//             if (!user) {
//                 return done(null, false, { message: "Incorrect username and/or password" });
//             }
//             const match = await bcrypt.compare(password, user.password);
//             if (!match) {
//                 return done(null, false, { message: "Incorrect username and/or password" });
//             }
//             return done(null, user);
//         } catch(err) {
//             return done(err);   
//         }
//     })
// );

// passport.serializeUser((user, done) => {
//     // console.log(user);
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await searchUserID(id);
//         // console.log(user);
//         done(null, user);
//     } catch(err) {
//         done(err);
//     }
// })

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

app.use("/", logInRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", authRouter);
app.get("/home", (req, res) => {
    res.render("home")}
);

app.listen(port, () => {
    console.log("Listening");
})