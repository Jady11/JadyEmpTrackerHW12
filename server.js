// Build a command line app that at a min
// allows the user to:
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "companyDB"

});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

// -start questions----
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Employees By Department",
                "View all Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View all Employees",
                employeeSearch():
                break;

            case "View all Employees By Department",
                departmentSearch():
                break;

            case  "View all Employees By Manager",
                managerSearch():
                break;

            case  "Add Employee",
                addEmployee():
                break;

            case "Remove Employee",
                removeEmployee():
                break;

            case "Remove Department",
                removeDepartment():
                break;

            case "Update Employee Role",
                updateEmployee():
                break;

            case "Exit",
                connection.end():
                break;
            }
        });
}

function employeeSearch() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        })
    };

function departmentSearch() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
};

function managerSearch() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
};

function listEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table;
    }) 
};

function addEmployee() {
    const listRoles=[];
    const currentEmployees=[];

    connection.query("SELECT title, id FROM role", function (err, res) {
        if (err) throw err;
        const rolesArray = res.map(function (obj) {
            return { name: obj.title, value: obj.id };
        });
        
        listRoles = rolesArray;

        connection.query("SELECT first_name, last_name, id FROM employee", function (err, res) {
            if (err) throw err;
            const employeeArray = res.map(function (obj) {
                return { name: first_name + " " + last_name, value: obj.id };
            });

            currentEmployees = employeeArray;

            inquirer
                .prompt([
                {
                    name: "firstName",
                    type: "input", 
                    message: "New employee First Name:"
                },
                {
                    name: "lastName",
                    type: "lastName",
                    message: "New employee Last Name:"
                },
                {
                    name: "employeeRole",
                    type: "list",
                    message: "Employee role:",
                    choices: listRoles
                },
                {
                    name: "roleManager",
                    type: "list",
                    message: "Employee's Manager:",
                    choices: currentEmployees
                }

            ]).then(function (response) {
                const query = "INSERT INTO employee SET ?"
                connection.query(query, { first_name: response.first_name, last_name: response.last_name, role_id: response.employeeRole, manager_id: response.roleManager});
                if (err) throw err;
                console.log(res.affectedRows + "New Employee added.\n");

                listEmployees()
            })
        })
    })
}

function removeEmployee() {
    const listEmployees=[];
    connection.query("SELECT first_name, last_name, id FROM employee", function (err, res) {
        if (err) throw err;
        const employeeArray = res.map(function (obj) {
            return { name: obj.first_name + " " + obj.last_name + obj.id };
        });
        
        listEmployees = employeeArray;

        inquirer
        .prompt({
            name: "removeEmployee",
            type: "list", 
            message: "Name of Employee removed:",
            choices: listEmployees
        })
        .then(function (response) {
            console.log(response.removeEmployee)
            const query = "REMOVE FROM employee WHERE ?"
            connection.query(query, { id: response.removeEmployee }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee has been removed.\n");

                listEmployees()
            })
        })
    });
}

function listDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table;
    }) 
}

function removeDepartment() {
    const currentDepartment=[];
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        const departmentArray = res.map(function (obj) {
            return obj.name;
        });
        
        currentDepartment = departmentArray;

        inquirer
        .prompt({
            name: "removeDepartment",
            type: "list", 
            message: "Department being removed:",
            choices: currentDepartment
        })
        .then(function (response) {
            console.log(response.removeDepartment)
            const query = "REMOVE FROM department WHERE ?"
            connection.query(query, { id: response.removeDepartment }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department has been removed.\n");

                listDepartments()
            })
        })
    });
}

function updateEmployee() {
    const listRoles=[];
    const currentEmployees=[];

    connection.query("SELECT title, id FROM role", function (err, res) {
        if (err) throw err;
        const rolesArray = res.map(function (obj) {
            return { name: obj.title, value: obj.id };
        });

        listRoles = rolesArray;

        connection.query("SELECT first_name, last_name, id FROM employee", function (err, res) {
            if (err) throw err;
            const employeeArray = res.map(function (obj) {
                return { name: obj.first_name + " " + obj.last_name, value: obj.id };
            });

            currentEmployees = employeeArray;

            inquirer
                .prompt([
                    {
                        name: "employeeName",
                        type: "list",
                        message: "Name of employee changing roles:",
                        choices: currentEmployees
                    },
                    {
                        name: "newRole", 
                        type: "list",
                        message: "Employees new role:",
                        choices: listRoles
                    }
                ]).then(function (response) {
                    const query = "UPDATE employee SET ? WHERE ?";
                    connection.query(query, { role_id: response.newRole, id: response.employeeName }, function (err, res){
                        if (err) throw err;
                        console.log(res.affectedRows + " Employee Role Changed.\n");

                        listEmployees()
                    });
                });
            });
        });
    }
    runSearch()







// roles------

// employees------

// -View departments, roles, employees.


// -Update employee roles.

// BONUS POINTS:
// -update employee managers

// -View employee by managers

// -Delete departments, roles, ane employees

// -View the total utilized budget of a department
    // --ie: the combined salaries of all employees in that department