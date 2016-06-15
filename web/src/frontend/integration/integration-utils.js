"use strict";
const fs = require('fs');
const createfile = require('create-file');
const path = '../../target/generated-resources/screenshots/';

const printBrowserLog = (client) => client.getLog('browser', loghandler('browser'));
const loghandler = (type) => (logEntries) => logEntries.forEach((log) => console.log(`[${type}::${log.level}] ${log.message}`));
const screenshot = (client, name, description) => {
    const filename = (name || client.currentTest.name) + '.png';
    const filepath = path + filename;
    const descfile = `${path}run-descriptor.cvs`;
    description = description || filename || '';

    console.log('Taking screenshot: ', filename);
    client.saveScreenshot(filepath);

    createfile(descfile, 'filename,comment\n', (err, data) => {
        fs.appendFileSync(descfile, `${filename},"${description}"\n`);
    });
};

const screenshotRunner = (prefix, client) => {
    let n = 0;
    return (name, description) => {
        screenshot(client, `${prefix}-${n}-${name}`, description);
        n++;
    }
};

module.exports = {
    printBrowserLog: printBrowserLog,
    loghandler: loghandler,
    screenshot: screenshot,
    screenshotRunner: screenshotRunner
};
