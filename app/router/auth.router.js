const auth = require('../controller/auth.controller.js');
const router = require('express').Router();




router.get('trial', auth.trial)

router.post('/login', auth.login);

router.post('/signup', auth.signup)
// router.get('/login', auth.login)



module.exports = router