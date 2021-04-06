// importing postgress
//const { Client } = require('pg');
// intialising object
// const client = new Client({
//     user: 'jpubavbncfmpku', //user
//     host: 'ec2-52-1-115-6.compute-1.amazonaws.com', //host
//     database: 'd7jtdq4g3cul50', //database
//     password: 'd3eabb8b91d0e564a4c85265e84290cad5ec650acd9b2fce302f935058c8c49d', //password
//     port: 5432, //port
// });
// establishing connection
const pg = require('pg')
const conn = {
    connectionString: 'postgres://jpubavbncfmpku:d3eabb8b91d0e564a4c85265e84290cad5ec650acd9b2fce302f935058c8c49d@ec2-52-1-115-6.compute-1.amazonaws.com:5432/d7jtdq4g3cul50',
    ssl: { rejectUnauthorized: false }
    }
const client = new pg.Client(conn);
client.connect();
// exporting client
module.exports = client;