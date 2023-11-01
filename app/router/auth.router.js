const auth = require('../controller/auth.controller.js');
const router = require('express').Router();

router.post('/', auth.signup)
router.get('/', auth.login)


module.exports = router