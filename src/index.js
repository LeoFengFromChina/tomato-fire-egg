#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const { dirExists, readFileList } = require('./util')
const { coreGererator } = require("./generator")

let templatePath = process.cwd() + "\\app\\model\\";
async function main(answers) {
    await dirExists(templatePath)
    const fileList = [];
    await readFileList(templatePath, answers.isDeep, fileList);
    console.log('fileList:' + JSON.stringify(fileList))
    fileList.forEach(fileObj => {
        if (answers.toGenerateType.indexOf("Controller") > -1) {
            coreGererator('Controller', fileObj.filename, answers.isOverWrite)
        }
        if (answers.toGenerateType.indexOf("Service") > -1) {
            coreGererator('Service', fileObj.filename, answers.isOverWrite)
        }
        if (answers.toGenerateType.indexOf("Router") > -1) {
            console.log('router genertor is comming.')
        }
        console.log(JSON.stringify(fileObj))
    })

}

inquirer
    .prompt([
        {
            name: "toGenerateType",
            type: "checkbox",
            message: "please select the file that you want to generate.",
            choices: ["Controller", "Service", "Router"],
            default: ["Controller", "Service"]
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
        main(answers)
        // console.log(JSON.stringify(answers))
        // console.log(process.cwd())
        // console.log("local link using."+__dirname )
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });