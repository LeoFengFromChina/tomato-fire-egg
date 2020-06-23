'use strict';
/**
* controller/service or router generator for tomato-fire-egg cli.
* Author:LeoFeng
* Date:2020-6-21 13:39:21
*/
const fs = require('fs');
const path = require('path')
const { dirExists, readFile, readFileList } = require('./util')
const { pascalCase } = require("pascal-case");
const templatePath = path.join(process.cwd(), 'app', 'model')
const gControllerDir = path.join(process.cwd(), 'app', 'controller')
const gServiceDir = path.join(process.cwd(), 'app', 'service')
const gRouterDir = path.join(process.cwd(), 'app')
const controllerTemplatePath = path.join(__dirname, 'template', 'controller.txt')
const serviceTemplatePath = path.join(__dirname, 'template', 'service.txt')
const routerTemplatePath = path.join(__dirname, 'template', 'router.tpl')
const format = require('dateformat');
function replaceTemplate(typeName, modelName, tPath, sFilePath,) {
    readFile(tPath).then(res => {
        //3-replacing the regex.
        let tKey = modelName.substr(0, modelName.lastIndexOf('.'));
        let txt = res.replace(/{{PSC_DOC_NAME}}/g, pascalCase(tKey));
        txt = txt.replace(/{{DOC_NAME}}/g, tKey);
        txt = txt.replace(/{{DATE_TIME}}/g, format(new Date(), 'yyyy-mm-dd HH:MM:ss'));
        //4-write final file.
        fs.writeFile(sFilePath, txt, function (error) {
            if (!error) {
                console.log(typeName + ' [' + modelName + "] generate success.")
            } else {
                console.log('generate ' + typeName + ' [' + modelName + "] Failed-1:")
                throw error
            }
        })
    }, err => {
        console.log('generate ' + typeName + ' [' + modelName + "] Failed-2:")
        throw err
    });
}
function routerTemplate(filepath, _name) {
    let oName = _name.substr(0, _name.indexOf('.'));
    readFile(filepath).then(res => {
        //already exist,do nothing.and skip.
        if (res.search("router.resources\\('" +
            oName + "', '\/" +
            oName + "', controller." +
            oName + "") > -1) {
            console.log('route [' + oName + ' ]already config')
            return;
        }
        let txt = null;
        let tpl = "router.resources('{{DOC_NAME}}', '/{{DOC_NAME}}', controller.{{DOC_NAME}});"
        tpl = tpl.replace(/{{DOC_NAME}}/g, oName);
        tpl = "{{tomato-fire-egg-generator-check-point}}" + "\r\n" + tpl
        txt = res.replace(/{{tomato-fire-egg-generator-check-point}}/g, tpl);
        console.log('going to set route:' + oName);
        if (!txt)
            return
        fs.writeFile(filepath, txt, function (error) {
            if (!error) {
                console.log("add " + ' [/' + oName + "] to app/router.js success.")
            } else {
                console.log("add " + ' [/' + oName + "] to app/router.js fail-1.")
                throw error
            }
        })
    }, err => {
        //app/router.js is not found.
        console.log('app/router.js is not found.')
    })
}
async function coreGererator(typeName, _name, _isOverWrite) {
    console.log('come in core generator!!!')
    let destiDir = gControllerDir;
    let destTemplatePath = controllerTemplatePath;
    switch (typeName) {
        case 'Controller':
            {
                destiDir = gControllerDir;
                destTemplatePath = controllerTemplatePath;
            }
            break;
        case 'Service': {
            destiDir = gServiceDir;
            destTemplatePath = serviceTemplatePath;
        } break;
        case 'Router': {
            destiDir = gRouterDir;
            destTemplatePath = routerTemplatePath;
        } break;
        default:
            break;
    }
    let filepath = path.join(destiDir, _name);
    if (typeName === 'Router') {
        //this is for router:
        filepath = path.join(destiDir, 'router.js');
        console.log('to write router file:' + _name)
        routerTemplate(filepath, _name)


    } else {
        //this is for controller and service:
        //0-skip if the controller already exists.
        readFile(filepath).then(res => {
            //already exist,do nothing.and skip.
            if (_isOverWrite) {
                //1-create controller floder when it's not exits.
                dirExists(destiDir)
                //2-begin
                console.log('begin to generate ' + typeName + ' [' + _name + "]...")
                replaceTemplate(typeName, _name, destTemplatePath, filepath)
            } else {
                console.log(typeName + ' [' + _name + '] already exists.')
            }
        }, err => {
            //1-create controller floder when it's not exits.
            dirExists(destiDir)
            console.log('begin to generate ' + typeName + ' [' + _name + "]...")
            replaceTemplate(typeName, _name, destTemplatePath, filepath)
        })
    }
}

module.exports = {
    async run(answers) {
        await dirExists(templatePath)
        const fileList = [];
        await readFileList(templatePath, answers.isDeep, fileList);
        if (!fileList || fileList.length <= 0) {
            console.log('>>> warn:no model file found in app/model folder.')
        } else {
            console.log('found model files:' + JSON.stringify(fileList))
        }
        fileList.forEach(fileObj => {
            if (answers.toGenerateType.indexOf("Controller") > -1) {
                coreGererator('Controller', fileObj.filename, answers.isOverWrite)
            }
            if (answers.toGenerateType.indexOf("Service") > -1) {
                coreGererator('Service', fileObj.filename, answers.isOverWrite)
            }
            if (answers.toGenerateType.indexOf("Router") > -1) {
                coreGererator('Router', fileObj.filename, answers.isOverWrite)
            }
            // console.log(JSON.stringify(fileObj))
        })
    }
}