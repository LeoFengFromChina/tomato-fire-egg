'use strict';
/**
* controller/service or router generator for tomato-fire-egg cli.
* Author:LeoFeng
* Date:2020-6-21 13:39:21
*/

const path = require('path')
const { dirExists, readFile, readFileList } = require('./util')
const { rControllerAndService, rRouter } = require('./g-replace')
const templatePath = path.join(process.cwd(), 'app', 'model')
const gControllerDir = path.join(process.cwd(), 'app', 'controller')
const gServiceDir = path.join(process.cwd(), 'app', 'service')
const gRouterDir = path.join(process.cwd(), 'app')
const controllerTemplatePath = path.join(__dirname, 'template', 'controller.txt')
const serviceTemplatePath = path.join(__dirname, 'template', 'service.txt')
const routerTemplatePath = path.join(__dirname, 'template', 'router.tpl')

async function coreGererator(typeName, _name, _isOverWrite) {
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
        filepath = path.join(destiDir, 'router.js');
        rRouter(filepath, _name)


    } else {
        readFile(filepath).then(res => {
            if (_isOverWrite) {
                dirExists(destiDir)
                console.log('begin to generate ' + typeName + ' [' + _name + "]...")
                rControllerAndService(typeName, _name, destTemplatePath, filepath)
            } else {
                console.log(typeName + ' [' + _name + '] already exists.')
            }
        }, err => {
            dirExists(destiDir)
            console.log('begin to generate ' + typeName + ' [' + _name + "]...")
            rControllerAndService(typeName, _name, destTemplatePath, filepath)
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
            return;
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
        })
    }
}