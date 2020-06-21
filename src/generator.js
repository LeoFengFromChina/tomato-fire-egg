

const fs = require('fs');
const { dirExists, readFile } = require('./util')
const { pascalCase } = require("pascal-case");
const { type } = require('os');
let gControllerDir = process.cwd() + "/app/controller/"
let gServiceDir = process.cwd() + "/app/service/"
let gRouterDir = process.cwd() + "/app/"
let controllerTemplatePath = __dirname + "/template/controller.txt"
let serviceTemplatePath = __dirname + "/template/service.txt"
let routerTemplatePath = __dirname + "/template/router.txt"

function replaceTemplate(typeName, modelName, tPath, sFilePath,) {
    readFile(tPath).then(res => {
        //3-replacing the regex.
        let tKey = modelName.substr(0, modelName.lastIndexOf('.'));
        let txt = res.replace(/{{PSC_DOC_NAME}}/g, pascalCase(tKey));
        txt = txt.replace(/{{DOC_NAME}}/g, tKey);
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
    //0-skip if the controller already exists.
    readFile(destiDir + _name).then(res => {
        //already exist,do nothing.and skip.
        if (_isOverWrite) {
            //1-create controller floder when it's not exits.
            dirExists(destiDir)
            //2-begin
            console.log('begin to generate ' + typeName + ' [' + _name + "]...")
            replaceTemplate(typeName, _name, destTemplatePath, destiDir + _name)
        } else {
            console.log(typeName + ' [' + _name + '] already exists.')
        }
    }, err => {
        //1-create controller floder when it's not exits.
        dirExists(destiDir)
        //2-begin
        console.log('begin to generate ' + typeName + ' [' + _name + "]...")
        replaceTemplate(typeName, _name, destTemplatePath, destiDir + _name)
    })
}

module.exports = {
    coreGererator: coreGererator
}