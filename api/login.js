const express = require('express');
const router = express.Router();
const passport = require("passport");

const initializePassport = require("../config/passportConfig");
initializePassport(passport);

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('../views/login.ejs');
});

router.post('/',
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })
);


function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}

module.exports = router;