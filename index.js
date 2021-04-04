// importing libs
const express = require('express');
const bodyparser = require('body-parser')
//setting up config 
const app = express();
app.use(bodyparser.urlencoded({ extended:false }))
app.use(bodyparser.json())
const PORT = 3000 || process.env.PORT;
// importing enpoints
const signUp = require('./endpoints/signUp');
const login = require('./endpoints/login');
const userList = require('./endpoints/userList');
// routing endpoints appropriately
app.use('/signUp', signUp);
app.use('/login', login);
app.use('/userList', userList);
//all other endpoints
app.use('/', function(req, res) {
    res.status(404).send('Invalid Endpoint');
});
//listening on port 3000
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

