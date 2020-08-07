const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const app = express();

passport.use(new Strategy(
    function(username, password, cb) {
        const user = models.Author.findOne({ where: { username: username, password: password}});
        if (!user) { return cb(null, false) }
        return cb(null, user)
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
});

const authorRoute = require("./routes/authors");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const rootIndex = require("./routes/index");
const { models } = require("mongoose");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
  function(req, res){
    res.send('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


app.use("/author", require("connect-ensure-login").ensureLoggedIn(), authorRoute);
app.use("/post", require("connect-ensure-login").ensureLoggedIn(), postRoute);
app.use("/comment", require("connect-ensure-login").ensureLoggedIn(), commentRoute);
app.use("/", require("connect-ensure-login").ensureLoggedIn(), rootIndex);

app.listen(3000, function(){
    console.log(`Server started on port 3000`);
});