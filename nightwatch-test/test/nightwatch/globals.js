const AllureReporter = require('./../../../reporter');
const reporter = new AllureReporter({
    option1: 'value1',
    option2: 'value2'
});

module.exports = {

    PAUSE: 1000,
    WAIT: 500,

    reporter: reporter.write
};
