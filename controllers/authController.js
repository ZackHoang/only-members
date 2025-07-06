const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const { searchUser, searchUserID } = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
        try {
            const user = await searchUser(username);    
            // console.log(user);
            if (!user) {
                return done(null, false, { message: "Incorrect username and/or password" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect username and/or password" });
            }
            delete req.session.messages;
            return done(null, user);
        } catch(err) {
            return done(err);   
        }
    })
);

passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await searchUserID(id);
        // console.log(user);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

exports.authenticate = passport.authenticate("local", {
    successRedirect: "/home", 
    failureRedirect: "/",
    failureMessage: true
});