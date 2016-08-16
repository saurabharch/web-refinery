'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var config = require('../../../../config.json');

    var githubCredentials = {
        clientID: config.githubConfig.clientID,
        clientSecret: config.githubConfig.clientSecret,
        callbackURL: config.githubConfig.callbackURL
    };

    var createNewUser = function (token, tokenSecret, profile) {
        return User.create({
            twitter_id: profile.id
        });
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        var fullName = profile.displayName.split(' ');
        var firsName = fullName[0] ? fullName[0] : '';
        var lastName = fullName[1] ? fullName[1] : '';

        User.findOne({
                where: {
                    github_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        email: profile.email,
                        first_name: firsName,
                        last_name: lastName,
                        github_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback',
        passport.authenticate('github', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
