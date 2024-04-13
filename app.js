const express = require('express');
const routers = require('./api');
const path = require('path');
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require('dotenv').config();
const passport = require("passport");


const app = express();

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //default views path
app.use(express.static(__dirname + '/assets')); //bootstrap path
app.use(express.static(__dirname + '/views')); 

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const initializePassport = require("./config/passportConfig");

initializePassport(passport);

app.use(
  session({
      // Key we want to keep secret which will encrypt all of our information
      secret: process.env.SESSION_SECRET,
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
  })
);

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

app.use(flash());

app.use('/', routers);

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})
