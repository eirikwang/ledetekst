// eslint-disable
const server = require('../integration/server');
module.exports = {
    startNode: function () {
        server.startServer();
    },
    stopNode: function () {
        server.stopServer();
    }
};