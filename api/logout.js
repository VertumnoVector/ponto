const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
        req.flash("success_msg", "Saiu do sistema com sucesso.");
        res.redirect('/login');
    });
});

module.exports = router;