# nightwatch-allure-reporter

###### Allure reporter for Nightwatch.js. Tested with Nightwatch.js v.0.9.21

##### Add to project
globals.js:
```javascript 1.6
const AllureReporter = require('nightwatch-allure-reporter');
const reporter = new AllureReporter({
    option1: 'value',
    option2: 'value'
});

module.exports = {
    reporter: reporter.write   
};
```