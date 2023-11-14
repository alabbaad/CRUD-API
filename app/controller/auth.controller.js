const User = require("../model/auth.model")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const saltRounds = 10


//create a new user and add to the database
exports.signup = (req, res)=>{
        if (req.body) {

          bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
            if (err) {
              console.error(err)
            }
            // use the index of the password value to pass to bcrypt
            // Store hash in your password DB.
            req.body.pass = hash // replace plain text password with hash
            // console.log(userData)

            User.create(req.body, (error, results)=>{
                res.status(200).json({ 
                    message: "User created",
                    user: results })
            })
            
          })
        } else {
          res.status(400).send("Error")
        }
}



// Use Passport to login into the application
exports.login = (req, res, next) => {
//const {email, password} = req.body

passport.authenticate('local', (err, user, info) => {
  if (err) {
    return res.status(500).json({ 
      error: 'Authentication error',
      message: "Passport unable to authenticate" });
  }

  if (!user) {
    return res.status(400).json({ 
      error: 'Authentication failed',
      message: "No user found" });
  }

  req.logIn(user, (err) => {
    if (err) {
      console.log(user)
      return res.status(500).json({ 
        error: 'Authentication error',
        message: 'Not sure what is happening here',
        added: err});
        
    }

    return res.status(200).json({ 
      message: 'Login successful',
      phoneNumber: user.phone});
  });
})(req, res, next);   
  };

  exports.isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    return res.status(401).json({ error: 'Unauthorized' }); // User is not authenticated, send 401 Unauthorized
  }
  };