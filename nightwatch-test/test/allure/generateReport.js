const cd = require('shelljs');
const path = require('path');

const allureCmd = require('allure-commandline');
const allureReport = allureCmd(['generate', 'allure-results', '--clean']);

module.exports = function() {

    cd(path.join(__dirname, '..', '..', '..'));

    allureReport.on('exit', function(exitCode) {
        console.log(`Allure report has been generated! Exit code: ${exitCode}.`);
    });
};
