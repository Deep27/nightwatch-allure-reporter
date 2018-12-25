module.exports = {

    '@tags': ['google', 'success'],

    'load page': client => {
        client
            .url('http://www.google.com')
            .waitForElementVisible('body', client.globals.WAIT)
            .assert.title('Google');
    },

    'execute search query': client => {
        client
            .assert.visible('input[type=text]')
            .setValue('input[type=text]', 'nightwatch-allure-adapter')
            .waitForElementVisible('input[name=btnK]', client.globals.WAIT)
            .click('input[name=btnK]');
    },

    'assure search is correct': client => {
        client
            .pause(client.globals.PAUSE)
            .assert.containsText('#main', 'nightwatch')
            .end();
    }
};