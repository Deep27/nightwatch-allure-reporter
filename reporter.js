const Allure = require('allure-js-commons');
const allureReporter = new Allure();
const Runtime = require('allure-js-commons/runtime');
const allureRuntime = new Runtime(allureReporter);

// (file = suite) => (testCase = test = step) => assertion

let self = module.exports = {

    write: results => {

        // console.log('results:');
        // console.log(results);

        for (const s in results.modules) {

            const suite = results.modules[s];

            allureReporter.startSuite(s, self.getTimestamp(suite.timestamp));

            console.log(`Suite: ${s}:\t`);
            console.log(suite);

            for (const t in suite.completed) {

                const test = suite.completed[t];
                // console.log(`\tTest: ${t}:\t\t`);
                // console.log(test);

                test.assertions.forEach(a => {
                    console.log(`Assertion: ${a.message}`);
                });
            }

            allureReporter.endSuite(self.addMillisToDate(suite.timestamp, 1000 * suite.time));

            console.log(`Start date: ${suite.timestamp}`);
            console.log(`End date: ${self.getStringDate(self.addMillisToDate(suite.timestamp, 1000 * suite.time))}`)
        }
    },

    getTimestamp: stringDate => {
        return Date.parse(stringDate);
    },

    addMillisToDate: (date, millis) => {
        return new Date(self.getTimestamp(date) + millis);
    },

    getStringDate: timestamp => {
        let u = new Date(timestamp);
        return `${u.getUTCFullYear()}-${('0' + u.getUTCMonth()).slice(-2)}-${('0' + u.getUTCDate()).slice(-2)} ${('0' + u.getUTCHours()).slice(-2)}:${('0' + u.getUTCMinutes()).slice(-2)}:${('0' + u.getUTCSeconds()).slice(-2)}.${(u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)}`;
    }
};

