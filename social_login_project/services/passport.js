const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const gmail = require('../config/gmail');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: gmail.clientID,
    clientSecret: gmail.clientSecret,
    callbackURL: gmail.redirectURI
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            user = profile;
            return done(null, user);
        });
    }
));