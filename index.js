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

async function init() {
    const response = await inquirer.prompt(questions)

    if(response.choice === 'Quit') {
        console.log('Program ended, press CTRL+C to stop server')
        
    }
    
    switch (response.choice) {
        case 'View all departments':
            check('View all departments')
            break;
    }
}

function check(name) {
    if(name === 'View all departments') {
    console.log('t')
    init()
    }
}
