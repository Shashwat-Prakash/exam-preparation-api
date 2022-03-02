const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

var user = mongoose.model("User");

passport.use(
  new localStrategy({ usernameField: "username" }, (email, password, done) => {
    user.findOne({ username: email }, (error, user) => {
      if (error) return done(error);
      else if (!user)
        return done(null, false, { message: "Username is not registered." });
      else if (!user.verifyPassword(password))
        return done(null, false, { message: "Worng Password." });
      else return done(null, user);
    });
  })
);
