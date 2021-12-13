USE employee_db;

INSERT INTO department (name) 
VALUES ("Management"), ("Sales"), ("Finance"), ("Production"), ("Service");

INSERT INTO role (Title, Salary, department_id) 
VALUES ("CEO", 150000, 1),
 ("CFO", 125000, 3),
 ("Sales Lead", 90000, 2),
 ("Lead Engineer", 100000, 4),
 ("Service Manager", 90000, 5),
 ("Service Technician", 60000, 5),
 ("Assembly Technician", 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Jan", "Johnson", 1, null),
 ("Winter", "Laurant", 4, null),
 ("Butch", "Rollie", 2, null),
 ("Ward", "Wicker", 5, 1),
 ("Cameron", "Ellis", 7, 2),
 ("Chloe", "Elwood", 6, 4),
 ("Kim", "Domina", 3, 3);




