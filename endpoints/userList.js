// importing libs
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// defining router
const router = express.Router();

// importing db connection
const client = require('../db/conn');

//userList endpoint
router.post('/', function(req, res){
    // reading body params
    const token = req.body.token || null;
    const email = req.body.email || null;
    const limit = req.body.limit || 0;
    const offset = req.body.offset || 0;
    
    // validating if token is not null
    if(token === null || token === '') {
        res.status(400).send('Invalid Token');
    }
    
    // validating if email is not null
    else if(email === null || email === '') {
        res.status(400).send('Invalid email');
    }
    else {
        // verifying jwt token
        jwt.verify(token, 'login-auth', function (err, decoded) {
            // if expired or err
            if(err){
                console.log('Invalid Token');
                res.status(400).send('Invalid Token');
            }
            // if valid
            else{
                // validating if data from token is equal to email
                const data = bcrypt.compareSync(email, decoded['data']);
                if(data) {
                    // querying users from USERS table
                    const query = `SELECT * FROM USERS LIMIT ${limit} OFFSET ${offset};`;
                    client.query(query, (err, result) => {
                        if(err) {
                            console.log(err);
                            res.status(400).send(err);
                        }
                        else {
                            if(result && result.rows.length > 0) {
                                res.status(200).send(result.rows);
                            }
                            else{
                                res.status(400).send('No more rows present');
                            }
                        }
                    });
                }
                // if invalid token
                else {
                    console.log('Invalid Token')
                    res.status(400).send('Invalid Token');
                }
            }
            
        });
    }
});


// all other post endpoints
router.post('/', function(req, res){
    res.status(200).send('Invalid Endpoint');
});

// all other get endpoints
router.get('/', function(req, res) {
    res.status(404).send('Invalid Endpoint');
});

// exporting userList
module.exports = router;