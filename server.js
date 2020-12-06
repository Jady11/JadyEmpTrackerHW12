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

// -Add departments------
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
                "Update Employee Manager",
                "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View all Employees",
                employeeSearch():
                break;

            case "View all Employees By Department",
                multiSearch():
                break;

            case  "View all Employees By Manager",
                managerSearch():
                break;

            case  "Add Employee",
                addEmployee():
                break;

            case "Remove Employee",
                deleteEmployee():
                break;

            case "Update Employee Role",
                updateEmployee():
                break;

            case  "Update Employee Manager",
                updateManager():
                break;

            case "Exit",
                connection.end():
                break;
            }
        });
}
// roles------

// employees------

// -View departments, roles, employees.


// -Update employee roles.

// BONUS POINTS:
// -update employee managers

// -View employee by managers

// -Delete departments, roles, ane employees

// -View the total utilized budget of a department
//     --ie: the combined salaries of all employees in that department


