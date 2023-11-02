const db = require("../db.config")
//import passport and the passport strategy to be used.
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require ('bcryptjs')



//use this in place of the database
const users = [
{   id:1, 
    fname: "Sanni-Anibire", 
    lname:"Toyyib", 
    email:"sanni@yahoo.com", 
    password:"admin"}
]
// Passport config

//Use the passport 
passport.use(
    new LocalStrategy(function verify (email, password, done){
        const user = users.find((u) => u.email === email);

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

        if (user.password !== password){
            return done(null, false, { message: 'Incorrect password.' });
        }

        return (next, user)
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
  });



//create a new user and add to the database
exports.signup = (req, res)=>{
    const {id, fname, lname, email, pass} = req.body

    console.log
    if (!req.body){
        res.status(400).send({
            message: "Fields cannot be empty"
        })
    }else if (!req.body.id){
        res.status(400).send({
            message: "id field is missing"
    })
}else if (!req.body.fname){
        res.status(400).send({
            message: "First name field is missing"
    })
}else if (!req.body.lname){
    res.status(400).send({
        message: "Last name field is missing"
    });
} else if (!req.body.email){
    res.status(400).send({
        message: "Email field is missing"
      });
} else if (!req.body.pass){
    res.status(400).send({
        message: "Password missing"
    })
} else {
    console.log("Registration successful");

    user.push(req.body)

    res.status(200).send({
        message: "Registration successful!!",
        data: req.body
    })
}
}

//use passport to login into the application
exports.login = (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
        //failureFlash: true, // Enable flash messages for error handling
      }) (req, res, next)
}


exports.trial = (req, res, next)=>{
    res.send("not authenticated")
}