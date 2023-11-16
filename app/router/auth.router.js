const auth = require('../controller/auth.controller.js');
const router = require('express').Router();
const passport = require('passport')



//router.get('/trial', auth.trial)

router.post('/login', auth.login, async (req, res)=>{
    try{
        res.send("It works")
    }catch(error){
        res.send("My code sucks")
    }
        
});

router.get('/login', (req, res)=>{
    res.send("Not logged in. Try again")
})
router.get('/protected', auth.isAuthenticated, (req, res)=>{
    var user = req.user
    if (!user){
        res.send('user not authenticated')
    }
    res.json({
        message: "Hi! I'm logged in",
        user: req.user

})

})

router.get('/trial', (req, res)=>{
    var user = req.user
    if (!user){
        res.send('user not authenticated')
    }
    res.json({
        message: "Hi! I'm logged in",
        user: req.user
})
})
router.get('/logout', (req, res) => {
    // Passport adds this method to the request
    // Redirect to the home page or any other desired page
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  });
  

router.post('/signup', auth.signup)
// router.get('/login', auth.login)



module.exports = router