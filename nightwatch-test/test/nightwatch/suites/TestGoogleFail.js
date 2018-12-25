module.exports = {

    '@tags': ['google', 'fail'],

    'load page': client => {
        client
            .url('http://www.google.com')
            .waitForElementVisible('body', client.globals.WAIT)
            .assert.title('Google');
    },

    'execute search query with mistake in test': client => {
        client
            .assert.visible('input[type=text]')
            .setValue('input[type=text]', 'nightwatch-allure-adapter')
            .waitForElementVisible('input[name=btnGGG]', client.globals.WAIT) // wrong name
            .click('input[name=btnGGG]') // wrong name
    },

    'assure search is correct': client => {
        client
            .pause(client.globals.PAUSE)
            .assert.containsText('#main', 'nightwatch')
            .end();
    }
};
