const inquirer = require("inquirer");

const questions = {
  mainMenu: {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View all employees.",
      "Add employee",
      "Update employee role.",
      "View all roles.",
      "Add role.",
      "View all departments.",
      "Add department.",
      "quit",
    ],
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
      message: "in what department is this role?",
      name: "roleDepartment",
    },
  ],
};

console.log();
function init(questions) {
  inquirer.prompt(questions.mainMenu);
}

init(questions);
