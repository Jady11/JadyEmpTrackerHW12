 -- database schema with three tables
DROP DATABASE IF EXISTS companyDB;
CREATE database companyDB;

USE companyDB;

-- department: 
    -- id-INT PK, 
    -- name-VARCHAR(30), to hold dept name
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);
-- role: 
    -- id-INT PK
    --title-VARCHAR(30) to hold role title
    --salary-DECIMAL to hold role salary
    --department_id-INT to hold reference to dept role belongs too
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id),
;)
-- employee:
    --id-INT PK
    --first_name-VARCHAR(30) to hold employee first name
    --last_name-VARCHAR(30) to hold employee last name
    --role_id-INT to hold reference to role empl has
    --manager_id-INT to hold reference to another emp 
        -- that manages the emp being Ceated. 
        -- THis field may be null if the emp has no manager
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);
