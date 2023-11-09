const User = require("../model/auth.model")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const saltRounds = 5

passport.use(new LocalStrategy({
    usernameField: "email",
    //passwordField: "password"
}, function verify(email, password, done) {
    //  email = req.body.email;
    //  password = req.body.password;

    console.log(email)
    console.log(password)

   User.login(email, (error, results)=>{
        //res.send(results)
        bcrypt.compare(password, results.password, function (err, data){
            if (err) res.send(error)
            if (data){
                console.log(data)
            }else{
                console.log("Password mismatch")
            }
        })
    }); 
} 
));

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
    res.status(200).send("Logged in")
    /*
    passport.authenticate('local', function (err, user, info) {
        //user = req.body
          if (err) {
          return res.status(500).send("Authentication error.");
        }
        if (!user) {
          console.error(info)
          return res.status(400).send("Authentication failed.");
        }
        req.login(user, function (err) {
          if (err) {
            return res.status(500).send("Authentication error. User input");
          }
          return res.status(200).send("Login successful");
        });
      })(req, res, next);
      */
  };