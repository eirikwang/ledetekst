// eslint-disable-file
const chromedrivers = {
    'linux': './selenium/chromedriver',
    'win32': './selenium/chromedriver.exe',
    'win64': './selenium/chromedriver.exe'
};

const phantomjsdrivers = {
    'linux': './selenium/phantomjs',
    'win32': './selenium/phantomjs.exe',
    'win64': './selenium/phantomjs.exe'
};

module.exports = ((settings) => {
    settings.selenium.cli_args['webdriver.chrome.driver'] = chromedrivers[process.platform];
    settings.selenium.cli_args['phantomjs.binary.path'] = phantomjsdrivers[process.platform];

    var args = process.argv;
    if(args[2] === '--config' || JSON.parse(args[2])["phantomjs"] === true) {
        settings['test_settings'].default.desiredCapabilities.browserName = 'phantomjs';
    }

    return settings;
})(require('./nightwatch.json'));
