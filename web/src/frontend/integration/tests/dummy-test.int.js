"use strict";
const expect = require('chai').expect;
const Utils = require('./../integration-utils');
let dummy;
let WAIT_TIME;
let screenshot;

module.exports = {
    before: (client) => {
        WAIT_TIME = client.globals.wait;
        screenshot = Utils.screenshotRunner('1', client);
        dummy = client.init().page.dummy();
        dummy.navigate();
    },
    after: (client) => {
        client.end();
    },
    beforeEach: (client) => {
        Utils.printBrowserLog(client);
    },
    "gå til oversikt for mistet jobben": (client) => {
        const elements = dummy.elements;

        client.expect.element(elements.tittel.selector).to.be.present.after(WAIT_TIME);
        screenshot("dummy-side", "Viser automatisk skjermbilde");
    }
};
