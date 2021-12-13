const inquirer = require("inquirer");
const db = require("./config/connection");
// require("console.table");

const questions = {
  mainMenu: {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
    name: "action",
  },
  addEmployee: [
    {
      type: "input",
      message: "what is the employees first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "what is the employees last name?",
      name: "lastName",
    },
    {
      type: "input",
      message: "what is the employees role?",
      name: "role",
    },
    {
      type: "input",
      message: "who is the employees manager?",
      name: "manager",
    },
  ],
  addRole: [
    {
      type: "input",
      message: "what is the role?",
      name: "roleName",
    },
    {
      type: "input",
      message: "what is the salary for this role?",
      name: "roleSalary",
    },
    {
      type: "input",
      message: "What department does the role belong to?",
      name: "roleDepartment",
      // db.query for all the departments and make choices list for the available
    },
  ],
  updateEmployee: [
    {
      type: "list",
      message: "Which employee would you like to update?",
      name: "employeeUpdate",
      choices: "",
      // db.query for list of all employees
    },
    {
      type: "list",
      message: "What is their new role?",
      name: "employeeNewRole",
      choices: "",
      //db.query for list of all roles
    },
  ],
};

function init() {
  console.table(questions.addDepartment);
  inquirer.prompt(questions.mainMenu).then((data) => {
    console.log(data);
    switch (data.action) {
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateRole();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Quit":
        quit();
        break;
    }
  });
}

function quit() {
  console.log("Goodbye!");
  console.table(questions.addEmployee);
}

init();

function viewEmployees() {
  console.table(db.query(`SELECT * FROM employees`));
}

function addEmployee() {
  console.log(questions.addEmployee);
  inquirer.prompt(questions.addEmployee).then(function (res) {
    var query = db.query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)",
      {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.role,
        manager_id: res.manager,
      },
      function (err) {
        if (err) throw err;
        console.table(res);
        console.log(typeof res.firstName);
        console.log(typeof res.manager);
        init();
      }
    );
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
