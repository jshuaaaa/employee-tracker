const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const fs = require('fs');
const { checkPrime } = require('crypto');

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

// Questions for database selection
const questions = [{
    
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Quit'],
        name: 'choice'
}]

const departmentQuestion = [{
  type: "input",
  message: "Enter department name: ",
  name: "name"
}]

async function init() {
    const response = await inquirer.prompt(questions)

    if(response.choice === 'Quit') {
        console.log('Program ended, press CTRL+C to stop server')
        
    }
    
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
    }
}

function check(name, response) {
  if(name === 'View all departments') {
  db.query(`SELECT * FROM department`, function (err, results) {
      console.log(results)  
    })

      init()
    }

  if(name === 'View all roles') {
    db.query(`SELECT * FROM role`, function (err, results) {
      console.log(results)  
    })
    
      init()
      }

  if(name === 'View all employees') {
    db.query(`SELECT * FROM employee`, function (err, results) {
      console.log(results)  
    })
    
      init()
      }


  if(name === 'add a department') {
    db.query(`INSERT INTO department (name) VALUES (?)`,response, function (err, results) { 
    })

      init()
      }
      
  if(name === 'View all roles') {
          
      init()
      }
  if(name === 'View all employees') {
          
     init()
      }
      
  if(name === 'View all employees') {
          
      init()
      }
}


async function addDepartment() {
  const response = await inquirer.prompt(departmentQuestion)
  check("add a department", response.name)
}