// importing postgress
const { Client } = require('pg');
// intialising object
const client = new Client({
    user: 'postgres', //user
    host: 'localhost', //host
    database: 'login_task', //database
    password: 'postgres', //password
    port: 5432, //port
});
// establishing connection
client.connect();
// exporting client
module.exports = client;