const db = require("./config/connection");

viewEmployees((req, res) => {
  db.query(`SELECT * FROM employees`, (err, rows) => {
    console.table(data);
  });
});

addEmployee();

updateRole();

viewRoles();

addRole();

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function addDepartment() {
  console.log(questions.addDepartment);
  inquirer.prompt(questions.addDepartment).then(function (res) {
    var query = db.query(
      "INSERT INTO department SET ? ",
      {
        name: res.name,
      },

      console.table(res)
    );
  });
}

module.exports = viewEmployees;
