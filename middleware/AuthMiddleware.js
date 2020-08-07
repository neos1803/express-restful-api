// const passport = require("passport");
// const jsonwebtoken = require("jsonwebtoken")
// const Strategy = require("passport-local").Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// // opts.issuer = 'accounts.examplesoft.com';
// // opts.audience = 'yoursite.net';

// // Jwt Passport Strategy
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log(jwt_payload)
//     models.Author.findOne({
//         where: {
//             username: jwt_payload
//         }
//     })
//     .then((data) => {
//         const user = data.dataValues;
//         return done(null, user)
//     })
//     .catch((err) => { return done(null, false) })
// }));

// passport.serializeUser(function(user, cb) {
//     console.log(user.id)
//     cb(null, user.id);
// });
  
// passport.deserializeUser(function(id, cb) {
//     console.log(id)
//     models.Author.findByPk(id, function (err, user) {
//       if (err) { return cb(err); }
//       cb(null, user);
//     });
// });