const auth = require('../controller/auth.controller.js');
const router = require('express').Router();
const passport = require('passport')



//router.get('/trial', auth.trial)

router.post('/login', passport.authenticate('local', 
{successRedirect: '/',
failureRedirect: 'auth/login'}), 
 auth.login);

router.get('/login', (req, res)=>{
    res.send("Cannot login. Try again")
})
router.post('/signup', auth.signup)
// router.get('/login', auth.login)



module.exports = router