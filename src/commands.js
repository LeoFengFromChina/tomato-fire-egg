'use strict';
/**
 * all commands for tomato-fire-egg cli.
 * Author:LeoFeng
 * Date:2020-6-21 13:39:21
 */
const inquirer = require('inquirer');
const init = require('./init')
module.exports = {
    init() {
        inquirer
            .prompt([
                {
                    name: "projectName",
                    type: "input",
                    message: "please input your project name:",
                    default: "tomato-egg-basic"
                }
            ])
            .then(answers => {
                init.run(answers)
            })
            .catch(error => {
                if (error.isTtyError) {
                    console.log('Prompt couldn\'t be rendered in the current environment.')
                } else {
                    console.log('Something else when wrong.')
                }
            });

    },
    startGenerate(func) {
        inquirer
            .prompt([
                {
                    name: "toGenerateType",
                    type: "checkbox",
                    message: "please select the file that you want to generate.",
                    choices: ["Controller", "Service", "Router"],
                    default: ["Controller", "Service", "Router"]
                },
                {
                    name: "isDeep",
                    type: "confirm",
                    message: "search file inner model folder's child dir?",
                    default: false
                },
                {
                    name: "isOverWrite",
                    type: "confirm",
                    message: "Over Write the controller/service file when already exists ?",
                    default: false
                }
            ])
            .then(answers => {
                if (func) {
                    func(answers)
                } else {
                    console.log('nothing to do after inquirer input.')
                }
            })
            .catch(error => {
                if (error.isTtyError) {
                    console.log('Prompt couldn\'t be rendered in the current environment.')
                } else {
                    console.log('Something else when wrong.')
                }
            });
    }
}