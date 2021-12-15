const inquirer = require("inquirer");
const db = require("./config/connection");

// require("console.table");
// In my opinion the built in console.table looks better than this npm version. I have installed it however and the app runs just fine with either.

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
  addDepartment: [
    {
      type: "input",
      message: "What Departement Would You Like to Add?",
      name: "addDepartment",
    },
  ],
  updateEmployee: [
    {
      type: "input",
      message: "What is the id of the employee you wish to update?",
      name: "employeeUpdateId",
      // db.query for list of all employees
    },
    {
      type: "input",
      message: "What is id of their new role?",
      name: "employeeNewRoleId",

      //db.query for list of all roles
    },
  ],
};

function init() {
  inquirer.prompt(questions.mainMenu).then((data) => {
    switch (data.action) {
      case "View All Employees":
        viewEmployees(init);
        break;
      case "Add Employee":
        addEmployee(init);
        break;
      case "Update Employee Role":
        updateRole(init);
        break;
      case "View All Roles":
        viewRoles(init);
        break;
      case "Add Role":
        addRole(init);
        break;
      case "View All Departments":
        viewDepartments(init);
        break;
      case "Add Department":
        addDepartment(init);
        break;
      case "Quit":
        quit();
        break;
    }
  });
}

function quit() {
  console.clear();
  console.log("Goodbye!");
  process.exit();
}

function viewEmployees() {
  console.clear();
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS Department, role.salary AS Salary, 

    CONCAT(m.first_name, " ", m.last_name) AS Manager

    FROM employees

    LEFT JOIN role
    ON employees.role_id = role.id

    LEFT JOIN department
    ON department.id = role.department_id

    LEFT JOIN employees m
    ON m.id = employees.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addEmployee() {
  console.clear();
  inquirer.prompt(questions.addEmployee).then(function (res) {
    const sql = "INSERT INTO employees SET ?";
    const params = {
      first_name: res.firstName,
      last_name: res.lastName,
      role_id: res.role,
      manager_id: res.manager,
    };
    db.query(sql, params, function (err) {
      if (err) throw err;
      console.table(res);
      // console.log(typeof res.firstName);
      // console.log(typeof res.manager);
      init();
    });
  });
}

function viewDepartments() {
  console.clear();
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function addDepartment() {
  console.clear();
  inquirer.prompt(questions.addDepartment).then(function (res) {
    const sql = `INSERT INTO department SET ?`;
    const params = { name: res.addDepartment };
    db.query(sql, params, function (err) {
      if (err) throw err;
      console.table(res);
      init();
    });
  });
}

function viewRoles() {
  console.clear();
  db.query(
    `SELECT 
  role.id, 
  role.title, 
  department.name AS departments, 
  role.salary FROM role 
  LEFT JOIN department 
  on role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

function addRole() {
  console.clear();
  inquirer.prompt(questions.addRole).then(function (res) {
    const sql = "INSERT INTO role SET ?";
    const params = {
      title: res.roleName,
      salary: res.roleSalary,
      department_id: res.roleDepartment,
    };
    db.query(sql, params, function (err) {
      if (err) throw err;

      console.table(res);
      init();
    });
  });
}

function updateRole() {
  console.clear();
  db.query(`SELECT * FROM employees`, (err, res) => {
    if (err) throw err;
    console.table(res);
    db.query(`SELECT * FROM role`, (err, res) => {
      if (err) throw err;
      console.table(res);
      inquirer.prompt(questions.updateEmployee).then(function (res) {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [res.employeeNewRoleId, res.employeeUpdateId];
        db.query(sql, params, function (err) {
          if (err) throw err;
          console.table(res);
          init();
        });
      });
    });
  });
}

init();
