In this application we have used nodeJs to create some login API's
we have also added some authentication mechanism using JWT token

In this project we have used traditional nodeJs application file structure
index.js for handling and redirecting all the requests approproiately
conn.js is used to establishing connection with postgresql db
signUp.js is used to handle signUp endpoint
login.js is ued to handle login endpoint
userList.js is used to handle userList endpoint

In signUp endpoint we have tried to validate all the possible scenario's and send appropriate response
//body params (x-www-form-encoded in postman)
accordingly
first_name
last_name
email
password
age
employee_id
organisation_name

In login after validating email and password we are sending JWT token which will be required for userList
//body params (x-www-form-encoded in postman)
email
password

userList endpoint validate JWT token and then send userList as response
//body params (x-www-form-encoded in postman)
email
token
limit
offset