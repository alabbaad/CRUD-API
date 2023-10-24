const db = require("../db.config")

//Create CRUD endpoints

/*
Add new customer to the database by creating an object and inserting it into the db.
1. Check if request body is not empty
2. Destructure the request body so each variable has it's individual assigned value
3. Create a promise based function to handle the sql query

*/
exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Body cannot be empty!"
        });
        return;
    }

    const {name, phone_number, address} = req.body
    //Save Customer in DB
    function create(query) {
        return new Promise((resolve, reject) => {
          db.query(query, [name, phone_number, address], (err, result) => {
            if (err) {
              reject(err); // Reject the promise with the error
            } else {
              resolve(result); // Resolve the promise with the result
            }
          });
        });
      }
      
    //   const createQuery = `INSERT INTO Customers (name, phone_number, address) VALUES (${customer.name}, ${customer.phone_number}, ${customer.address})`; 
    const createQuery = "INSERT INTO Customers (name, phone_number, address) VALUES (?, ?, ?)"; 
    
      create(createQuery)
        .then((result) => {
          console.log('1 record added:', result);
          res.send("Customer successfully added")
        })
        .catch((error) => {
          res.send(error)
            console.error('Error:', error);
        });
    
     }


/*
We may want to update the customer profile using the email, 
*/

exports.update = (req, res)=>{

  const updateQuery = 'UPDATE Customers SET name = ?, phone_number = ?, address = ? WHERE id = ?';

    const customerId = req.params.id
    const { name, phone_number, address } = req.body;
    
    db.query(updateQuery, [name, phone_number, address, customerId], (err, result) => {
      if (err) {
          res.status(500).send(err.message);
      } else {
          res.status(200).send({
            "Message": 'Customer updated successfully', 
            "result": result.message});
      }
  });

}

exports.findAll = (req, res)=>{
  var retrieveQuery = "SELECT * FROM customers";
  console.log("Working ooo")

  function retrieveAll(query) {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err); // Reject the promise with the error
        } else {
          resolve(result); // Resolve the promise with the result
        }
      });
    });
  }

  retrieveAll(retrieveQuery)
  .then((result) => {
    console.log('1 record retrieved:', result);
    res.json(result)
  })
  .catch((error) => {
    res.send(error)
      //console.error('Error:', error);
  });
  
}


exports.findOne = (req, res)=>{
  const customerId = req.params.id
  const findQuery = "SELECT * FROM customers WHERE id = ?"

  function retrieveById(query){
    return new Promise((resolve, reject)=>{
        db.query(query, [customerId], (err, result)=>{
          if (err) {
            reject (err);
          }else{
            resolve(result);
          }
        })
    })
  }

  retrieveById(findQuery)
  .then((result)=>{
    console.log("One record retrieved")
    res.json(result)
  })
  .catch((error)=>{
    res.send(error)
  })

}

exports.deleteAll = (req, res)=>{
const deleteQuery = "DELETE FROM customers"


function deleteAll(query){
  return new Promise((resolve, reject)=>{
    db.query(query, (err, result)=>{
      if (err){
        reject (err);
      }else{
        resolve(result)
      }
    })
  })
}

deleteAll(deleteQuery)
.then((result)=>{
  console.log("All records have been deleted!")
  res.json(result)
})
.catch((error)=>{
  res.send(error)
})

}

exports.deleteOne = (req, res)=>{
const deleteQuery = "DELETE FROM WHERE id = ?"

const customerId = req.params.id

function deleteById(query){
    return new Promise((resolve, reject)=>{
      db.query(query, [customerId], (err, result)=>{
        if (err){
          reject(err);
        }else{
        resolve(result)
        }
      })
    })
}


deleteById(deleteQuery)
.then((result)=>{
  console.log(result.message)
  res.send("One entry removed")
})
}
