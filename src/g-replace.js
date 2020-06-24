const fs = require('fs');
const { pascalCase } = require("pascal-case");
const format = require('dateformat');
const { readFile } = require('./util')

async function replaceTemplate(typeName, modelName, tPath, sFilePath,) {
    readFile(tPath).then(res => {
        let tKey = modelName.substr(0, modelName.lastIndexOf('.'));
        let txt = res.replace(/{{PSC_DOC_NAME}}/g, pascalCase(tKey));
        txt = txt.replace(/{{DOC_NAME}}/g, tKey);
        txt = txt.replace(/{{DATE_TIME}}/g, format(new Date(), 'yyyy-mm-dd HH:MM:ss'));
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
async function routerTemplate(filepath, _name) {
    let oName = _name.substr(0, _name.indexOf('.'));
    await readFile(filepath).then(res => {
        if (res.search("router.resources\\('" +
            oName + "', '\/" +
            oName + "',") > -1) {
            console.log('route [' + oName + '] already config.')
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
                console.log("add " + '[/' + oName + "] to app/router.js success.")
            } else {
                console.log("add " + '[/' + oName + "] to app/router.js fail-1.")
                throw error
            }
        })
    }, err => {
        console.log('app/router.js is not found.')
    })
}
module.exports = {
    rControllerAndService: replaceTemplate,
    rRouter: routerTemplate
}