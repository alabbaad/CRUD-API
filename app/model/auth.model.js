const db = require("../db.config")

const User = {
  // Function to create a new user
  create: (userData, callback) => {

    const query = 'INSERT INTO customer_cred (FirstName, LastName, email, phone, password) VALUES (?, ?, ?, ?, ?)';
    const values = [userData.fname, userData.lname, userData.email, userData.phone, userData.pass];

    db.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
        console.log(error)
      } else {
        callback(null, results);
        console.log(results)
      }
    });
  },

  // Function to find a user by username and using the callback function to specify what to happen after
  login: (logindata, callback) => {

    const query = 'SELECT * FROM customer_cred WHERE email = ?';
    const values = [logindata];
    
    
    db.query(query, values, (error, results) => {
      if (error) {
        callback(error, null);
        //res.send(error)
      } else {
        if (results.length > 0) {
          callback(null, results[0]);
          //console.log(null, results[0]);
        } else {
          console.log(null, null);
          
        }
      }
    });

  },
};

module.exports = User;
