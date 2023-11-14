/*
This file contains the passport configuration to use with
for authentication
*/

//Import modules
const passport = require('passport')
const User = require("../model/auth.model")
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

//Passport Configuration
exports.Localauth = passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField:'password'
  }, async function verify(email, password, done){
    try{
      User.login(email, (error, results)=>{
        if (error){
          done (error)
        }else{
          bcrypt.compare(password, results.password, (err, data)=>{
            if (err) return done(err)
            if (data){
              done (null, results)
            }else{
              return done ({message: "Password mismatch"})
            }
          })
        }
      })
    }catch (error){
      done(error)
    }
})
);

