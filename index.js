const inquirer = require("inquirer");
const fs = require('fs')

// Questions for database selection
const questions = [{
    
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        name: 'choice'
    }
]

async function init() {
    const response = await inquirer.prompt(questions)
}

init()