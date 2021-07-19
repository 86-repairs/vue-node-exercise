const { Pool, Client } = require('pg')
const client = new Client();
const format = require('pg-format');


let pool = null;

function getPoolConnectionToDB(){
  pool = new Pool({
    user: "",
    host: "localhost",
    database:"sample_app",
    password: "",
    port: "5432", 
  })
  
}
exports.getPoolConnectionToDB = getPoolConnectionToDB;

async function executeInsert(query){
  await pool.query(format(query));
}
exports.executeInsert = executeInsert;

