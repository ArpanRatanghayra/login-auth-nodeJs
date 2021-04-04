CREATE TABLE USERS (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(500) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    age int,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE EMPLOYEE (
    employee_id INT PRIMARY KEY,
    organisation_name VARCHAR(50) NOT NULL,
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES USERS(user_id)
);