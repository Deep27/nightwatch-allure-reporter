const Allure = require('allure-js-commons');
const allure = new Allure();
const Runtime = require('allure-js-commons/runtime');
const allureRuntime = new Runtime(allure);

// (file = suite) => (testCase = test = step) => assertion

const write = results => {

    // console.log('results:');
    // console.log(results);

    for (const s in results.modules) {

        const suite = results.modules[s];

        allure.startSuite(s, getTimestamp(suite.timestamp));
        allure.startCase(s, getTimestamp(suite.timestamp));

        console.log(`Suite: ${s}:\t`);
        console.log(suite);

        for (const t in suite.completed) {

            allure.startStep(t, getTimestamp(suite.timestamp));
            const test = suite.completed[t];
            console.log(`\tTest: ${t}:\t\t`);
            console.log(test);

            test.assertions.forEach(a => {
                console.log(`Assertion: ${a.message}`);
            });
            allure.endStep("passed", getTimestamp(suite.timestamp));
        }

        allure.endCase("passed", "", getTimestamp(suite.timestamp));
        const suiteEndDate = addMillisToDate(suite.timestamp, 1000 * suite.time);
        console.log(`Suite end ${suiteEndDate}`);
        allure.endSuite(getTimestamp(suiteEndDate));

        console.log(`Start date: ${suite.timestamp}`);
        console.log(`End date: ${getStringDate(addMillisToDate(suite.timestamp, 1000 * suite.time))}`)
    }
};

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

module.exports = { write };

