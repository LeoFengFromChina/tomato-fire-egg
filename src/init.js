'use strict';
/**
 * command-init detail for tomato-fire-egg cli.
 * Author:LeoFeng
 * Date:2020-6-21 13:39:21
 */
const download = require('download-git-repo');
const path = require('path')
module.exports = {
    async run(answers) {
        console.log('>>> begin init egg project,please wait a minute...')
        download('direct:https://github.com/LeoFengFromChina/tomato-egg-basic.git',
            path.join(process.cwd(), answers.projectName),
            { clone: true },
            function (err) {
                if (!err) {
                    console.log('>>> project init Success.')
                    console.log('>>> what you need to do next:')
                    console.log('>>> 1- run \"cd '+answers.projectName+'\"'+' to go into project dir;')
                    console.log('>>> 2- run \"npm install \"'+' to install the dependencies;')
                    console.log('>>> 3- config the db setting accrodding to the README.md;')
                } else {

                    console.log('>>>project init Error.' + JSON.stringify(err))
                }
            })
    }
}