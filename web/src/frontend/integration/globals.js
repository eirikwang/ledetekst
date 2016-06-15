// eslint-disable
const server = require('./server');

module.exports = {
    wait: 5000,
    before: (done) => {
        server.startServer();
        done();
    },
    after: (done) => {
        server.stopServer();
        done();
    }
};