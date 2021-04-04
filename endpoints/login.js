// importing lib
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// defining router
const router = express.Router();

// importing db connection
const client = require('../db/conn');

// login endpoint
router.post('/', function(req, res) {
    // reading body params
    const email = req.body.email;
    const password = req.body.password;
    // validating email and password are not null
    if(email === null || email === '' || password === null || password === ''){
        res.status(404).send('Invalid Credentials');
    }
    else {
        //querying db for email and password entered by user
        const query = `SELECT * FROM USERS WHERE email = '${email}' AND password = '${password}';`;
        //executing query
        client.query(query, (err, result) => {
            if(err) {
                // if err 
                res.status(400).send(err);
            }
            else {
                // validating if result exists
                if(result && result.rows.length > 0) {
                    // encrypting data
                    const data =  bcrypt.hashSync(email,  bcrypt.genSaltSync(10));
                    // adding data to jwt token
                    var token = jwt.sign({ data: data }, 'login-auth', {
                        expiresIn: 300
                    });
                    //sneding with jwt token
                    res.status(200).send({ auth: true, token: token });
                }
                else {
                    // no rows found
                    res.status(404).send('Invalid Credentials');
                }
            }
        });
    }
});

// all other post endpoints 
router.post('/', function(req, res) {
    res.status(404).send('Invalid Endpoint');
});

// all other get endpoints
router.get('/', function(req, res) {
    res.status(404).send('Invalid Endpoint');
});

// exporting login
module.exports = router;