var mysql = require('mysql')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alabbaad",
    database: "node_backend"
})

conn.connect((err)=>{
    if (err) throw err;
    console.log(`Connected!`)
})



module.exports = conn


