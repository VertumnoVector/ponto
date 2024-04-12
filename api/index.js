const express = require('express');

const adminRouter = require('./admin');
const userRouter = require('./dashboard');
const loginRouter = require('./login');
const logout = require('./logout');
const forbidden = require('./403');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
})

router.use('/admin', adminRouter);
router.use('/dashboard', userRouter);
router.use('/login', loginRouter);
router.use('/forbidden', forbidden);
router.use('/logout', logout);

module.exports = router;
