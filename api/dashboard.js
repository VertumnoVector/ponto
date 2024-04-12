const express = require('express');
const router = express.Router();

router.get('/', checkAuthenticated, (req, res) => {
  if (req.user.isadmin) {
      return res.redirect('/admin'); // Redireciona usuários administradores para /admin
  }
  res.render('dashboard', { user: req.user.name });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next(); 
  }
  res.redirect("/login");
}


module.exports = router;
