const db = require("../db.config")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const user = [
    {id:1, fname: "Sanni-Anibire", lname:"Toyyib", email:"sanni@yahoo.com", pass:"admin"}
]


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

// // file:app/authentication/middleware.js
// function authenticationMiddleware () {
//     return function (req, res, next) {
//       if (req.isAuthenticated()) {
//         return next()
//       }
//       res.redirect('/login')
//     }
//   }

exports.login = (req, res)=>{
    res.status(200).send({
        message:"This is endpoint is working",
        data: user
    })
}