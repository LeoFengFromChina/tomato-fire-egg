#!/usr/bin/env node
'use strict';
/**
 * main entry for tomato-fire-egg cli.
 * Author:LeoFeng
 * Date:2020-6-21 13:39:21
 */
const coreGenerator = require("./generator")
const command = require('./commands')
const program = require('commander');
async function main() {
    program
        .version('1.0.6');
    program
        .command('gen').alias('g')
        .description('generate the controller/service or router\'s basic code.')
        .action(async function () {
            command.startGenerate(coreGenerator.run);
        });
    program
        .command('init')
        .description('to init the original egg code + some edit.')
        .action(async function () {
            command.init();
        });
    await program.parseAsync(process.argv);
}

main();
