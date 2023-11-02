const auth = require('../controller/auth.controller.js');
const router = require('express').Router();
const passport = require('passport');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/trial');
  }

router.get('trial', auth.trial)

router.post('/login', ensureAuthenticated, auth.login);

router.get('/signup', auth.signup)
// router.get('/login', auth.login)


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router