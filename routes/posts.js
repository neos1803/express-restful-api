const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken")
const Strategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require("../models")
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
}


// Jwt Passport Strategy
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    models.Author.findOne({
        where: {
            username: jwt_payload
        }
    })
    .then((data) => {
        const user = data.dataValues;
        return done(null, user)
    })
    .catch((err) => { return done(err, false) })
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
    models.Author.findByPk(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

router.get("/", PostController.read);
router.post("/", passport.authenticate("jwt", {session: false}), PostController.create);
router.get("/:id", passport.authenticate("jwt", {session: false}), PostController.find);
router.patch("/:id", passport.authenticate("jwt", {session: false}), PostController.update);
router.delete("/:id", passport.authenticate("jwt", {session: false}), PostController.delete);

module.exports = router;