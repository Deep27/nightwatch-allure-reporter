const Allure = require('allure-js-commons');
const allure = new Allure();
const Runtime = require('allure-js-commons/runtime');
const allureRuntime = new Runtime(allure);

function AllureReporter(options) {

    this.options = options;

    this.write = results => {
        console.log('OPTIONS:');
        console.log(this.options);

        for (const s in results.modules) {

            const suite = results.modules[s];

            allure.startSuite(s, getTimestamp(suite.timestamp));

            let currentTime = getTimestamp(suite.timestamp);
            console.log(`Test case start: ${currentTime}`);

            for (const t in suite.completed) {

                const test = suite.completed[t];

                allure.startCase(t, currentTime);
                currentTime = currentTime + test.timeMs;

                console.log(`\tTest: ${t}:\t\t`);
                console.log(test);

                test.assertions.forEach(a => {
                    allure.startStep(a.message, 0);
                    console.log(`Assertion: ${a.message}`);
                    allure.endStep(a.failure ? 'failed' : 'passed', 0);
                });

                if (test.failed > 0 || test.errors > 0) {
                    allure.endCase('failed', test.message, currentTime);
                } else if (test.skipped > 0) {
                    allure.endCase('skipped', "Testcase is skipped", currentTime);
                } else {
                    allure.endCase('passed', '', currentTime);
                }

                // allure.endCase("passed", "", currentTime);
                // testCaseStart = testCaseStart + test.timeMs;
            }

            const suiteEndDate = addMillisToDate(suite.timestamp, 1000 * suite.time);
            allure.endSuite(getTimestamp(suiteEndDate));
        }
    }
}

const getTimestamp = stringDate => {
    return Date.parse(stringDate);
};

const addMillisToDate = (date, millis) => {
    return new Date(getTimestamp(date) + millis);
};

const getStringDate = timestamp => {
    let u = new Date(timestamp);
    return `${u.getUTCFullYear()}-${('0' + u.getUTCMonth()).slice(-2)}-${('0' + u.getUTCDate()).slice(-2)} ${('0' + u.getUTCHours()).slice(-2)}:${('0' + u.getUTCMinutes()).slice(-2)}:${('0' + u.getUTCSeconds()).slice(-2)}.${(u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)}`;
};

module.exports = AllureReporter;

