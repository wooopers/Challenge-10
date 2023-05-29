const inquirer = require('inquirer');
const fs = require('fs');
const { generateLogo } = require('./lib/logoGenerator.js');
const CLI = require('./lib/cli.js');

const cli = new CLI();

cli.run();



