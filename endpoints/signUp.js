// importing lib
const express = require('express');

// defining router
const router = express.Router();

// importing db connection
const client = require('../db/conn');

// signUp endpoint
router.post('/', function(req, res) {
    // reading body params
    const first_name = req.body.first_name || null;
    const last_name = req.body.last_name || null;;
    const email = req.body.email || '';
    const password = req.body.password || null;
    const age = req.body.age || null;
    const employee_id = req.body.employee_id || null;
    const organisation_name = req.body.organisation_name || null;
    
    // defined pattern rules for name, age and employee_id
    const namePattern = /^[a-zA-Z]+$/;
    const agePattern = /^[0-9]+$/;
    
    // validating first_name (not null, string, only alphabets and length < 50)
    if(first_name === null || first_name === '' || typeof(first_name) !== 'string' || !first_name.match(namePattern) || first_name.length > 50){
        console.log(typeof(first_name))
        res.status(400).send('Invalid first_name')
    }

    // validating last_name (string, only alphabets and length < 50)
    else if(typeof(last_name) !== 'string' || !last_name.match(namePattern) || last_name.length >50){
        res.status(400).send('Invalid last_name')    
    }

    // validating email (not null,string and email regex)
    else if(email === null || email === '' || typeof(first_name) !== 'string' || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        res.status(400).send('Invalid email');
    }

    // validating password (not null, string anf length < 50)
    else if(password === null || password === '' || typeof(first_name) !== 'string' || password.length > 50) {
        res.status(400).send('Invalid password')
    }

    // validating age (not null and only number)
    else if(age === null || age === '' || !age.match(agePattern)) {
        res.status(400).send('Invalid age')
    }

    // validating employee_id (not null, and only number)
    else if(employee_id === null || employee_id === '' || !employee_id.match(agePattern)){
        res.status(400).send('Invalid employee_id')
    }

    // validaying organisation_name (not null, string, only alphabets and length < 50)
    else if(organisation_name === null || organisation_name === '' || typeof(organisation_name) !== 'string' || !organisation_name.match(namePattern) || organisation_name.length > 50){
        res.status(400).send('Invalid organisation_name')
    }

    //if all fields are validated
    else {
        // checking in employee table if employee_id already presents
        const employeeQueryToCheck = `SELECT * FROM EMPLOYEE WHERE employee_id = ${employee_id};`;
        client.query(employeeQueryToCheck, (err, result) => {
            if(err) {
                res.status(400).send(err);
            }
            else if(result && result.rows.length > 0) {
                res.status(400).send('employee_id exists');
            }
            // if not
            else {
                // inserting data into USERS
                const userQueryToInsert = `INSERT INTO USERS (first_name, last_name, email, age, password) VALUES 
                ('${first_name}', '${last_name}', '${email}', ${age}, '${password}');`;
                client.query(userQueryToInsert, (err, result) => {
                    if(err) { 
                        // checking if email already exists
                        if(err['constraint'] === 'users_email_key' && err['routine'] === '_bt_check_unique'){
                            console.log('Email already exists');
                            res.status(400).send('Email Already Exists');
                        }
                        else {
                            console.log(err)
                            res.status(400).send(err);    
                        }
                    }
                    else {
                        console.log('user record added successfully');      
                        //querying user_id  
                        const userQueryToCheck = `SELECT * FROM USERS WHERE email = '${email}';`;
                        client.query(userQueryToCheck, (err, result) => {
                            if(err) {
                                res.status(400).send(err);
                            }
                            if(result && result.rows.length > 0) {
                                user_id = result.rows[0]["user_id"];
                                // inserting data into EMPLOYEE
                                const employeeQueryToInsert = `INSERT INTO EMPLOYEE (employee_id, organisation_name, user_id) VALUES
                                ('${employee_id}', '${organisation_name}', ${user_id});`;
                                client.query(employeeQueryToInsert, (err, result) => {
                                    if(err){
                                        res.status(400).send(err);
                                    }
                                    else {
                                        console.log('employee record added successfully');
                                        res.status(200).send('Sign-Up successfull');
                                    }
                                });
                            }
                        });
                    }
                });
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

// exporting signUp
module.exports = router;