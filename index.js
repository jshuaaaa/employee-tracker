const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const fs = require('fs');
// Node dependencies

//SQL DB CONNECTIOn
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employee_tracker'
    },
   
  );

  db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    init();
  });

// Selection
const questions = [{
    
        type: 'list',
        message: "Choose what you would like to do.",
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Quit'],
        name: 'choice'
}]
// Questions for adding a department
const departmentQuestion = [{
  type: "input",
  message: "Enter department name: ",
  name: "name"
}]

// questions for adding a role
const roleQuestions = [{
  type: "input",
  message: "Enter the role title: ",
  name: "title"
},
  {type: "input",
    message: "Enter your role's salary here: ",
    name: "salary"
  },
  {type: "input",
    message: "Enter your role's department id here: ",
    name: "department_id"
  }
  ]

// questions for adding employee
  const employeeQuestions = [{
    type: "input",
    message: "Enter the employee's first name: ",
    name: "first_name"
  },
    {type: "input",
      message: "Enter the employee's last name: ",
      name: "last_name"
    },
    {type: "input",
    message: "Enter your employee's role id here: ",
    name: "role_id"
  },
{
  type: "input",
  message: "What is their manager's id?: ",
  name: "manager_id"
}]
// questions for updating an employee
  const updateEmployeeQuestions = [{
    type: "input",
    message: "Enter the id of the employee who's role you would like to change: ",
    name: "id"
  },
    {type: "input",
      message: "Enter the employee's new role id: ",
      name: "role"
    },
    ]
// init function that runs questions
async function init() {
    const response = await inquirer.prompt(questions)

    if(response.choice === 'Quit') {
        console.log('Program ended, press CTRL+C to stop server')
        
    }
    // switch statement which is used to parse data to check function based on what user selected
    switch (response.choice) {
        case 'View all departments':
            check('View all departments')
            break;
            case 'View all roles':
              check('View all roles')
              break;
              case 'View all employees':
                check('View all employees')
                break;
                case 'add a department':
                addDepartment()
                break;
                case 'add a role':
                addRole()
                break;
                case 'add an employee':
                addEmployee()
                break;
                case 'update an employee role':
                  updateEmployee()
                  break;
    }
}
// Function that checks for what the user selected
function check(name, response) {
  if(name === 'View all departments') {
  db.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    console.table(res);  
    })

      init()
    }

  if(name === 'View all roles') {
    db.query(`SELECT * FROM role`, function (err, res) {
      if (err) throw err;
      console.table(res);  
    })
    
      init()
      }

  if(name === 'View all employees') {
    db.query(`SELECT * FROM employee`, function (err, res) {
      if (err) throw err;
      console.table(res);  
    })
    
      init()
      }


  if(name === 'add a department') {
    db.query(`INSERT INTO department (name) VALUES (?)`,response, function (err, res) { 
      if (err) throw err;
    })

      init()
      }
      
  if(name === 'add a role') {
    db.query(`INSERT INTO role SET ?`, response, function (err, res) { 
      init()
    })
      
      }
  if(name === 'add an employee') {
    db.query(`INSERT INTO employee SET ?`, response, function (err, res) {
      if (err) throw err
      console.log(err)
      
    })
     init()
      }
      
  if(name === 'update an employee role') {
    db.query('UPDATE employee SET role_id=? WHERE id= ?',[response.role, response.id],function(err, res) {
      if (err) throw err;
      console.table(res);
    });
      init()
      }
}

// function to add a department
async function addDepartment() {
  const response = await inquirer.prompt(departmentQuestion)
  check("add a department", response.name)
}
// function to add a role
async function addRole() {
  const response = await inquirer.prompt(roleQuestions)
  check("add a role", response)
}
// function to add an employee
async function addEmployee() {
  const response = await inquirer.prompt(employeeQuestions)
  check("add an employee", response)
}
// function to update an employee's existing data
async function updateEmployee() {
  const response = await inquirer.prompt(updateEmployeeQuestions)
  check('update an employee role', response)
}