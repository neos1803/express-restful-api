const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken")
const Strategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require("./models")
const path = require("path")
require('dotenv').config();


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
const app = express();

// Passport Strategy
// passport.use(new Strategy(
//     function(username, password, cb) {
//         const user = models.Author.findOne({ where: { username: username, password: password}});
//         if (!user) { return cb(null, false) }
//         return cb(null, user)
//     }
// ));

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

const authorRoute = require("./routes/authors");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const rootIndex = require("./routes/index");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/login',
  function(req, res){
    res.send('login');
});
  
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await models.Author.findOne({
    where: {
      username: username,
      password: password
    }
  })

  if (user) {
    const token = jsonwebtoken.sign(user.dataValues.username, opts.secretOrKey);
    res.json({
      status: "Success",
      token
    })
  } else {
    res.json({
      status: "Fail",
      message: "User not found"
    })
  }
});

app.use("/author", passport.authenticate("jwt", {session: false}), authorRoute);
app.use("/post", passport.authenticate("jwt", {session: false}), postRoute);
app.use("/comment", passport.authenticate("jwt", {session: false}), commentRoute);
app.use("/", rootIndex);

app.listen(3000, function(){
    console.log(`Server started on port 3000`);
});