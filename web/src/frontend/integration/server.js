var exports = module.exports = {};
var express = require('express');
var app = express();
var restResponses = require('./rest-response');


app.get('/ledeteksteditor/*', (requ, resp, next) => {
    var search = new RegExp("^\/ledeteksteditor\/.*\\.[^\/]*$");
    var api = new RegExp("^\/ledeteksteditor\/api\/.*$");
    if (requ.url.search(search) === -1 && requ.url.search(api) === -1) {
        requ.url = '/ledeteksteditor';
    }
    next();
});
app.use('/ledeteksteditor', express.static("../main/webapp"));

app.get('/ledeteksteditor/api/*', (requ, resp, next) => {
    var apiMatch = new RegExp("^\/ledeteksteditor\/api(.*?)(\\?.*)?$");
    var match = requ.url.match(apiMatch);
    var apiPunkt = match[1];

    for (var url in restResponses) {
        var matcher = new RegExp(url);

        if (matcher.test(apiPunkt)) {
            resp.json(restResponses[url]);
            return;
        }
    }

    console.log('ingen mockdata for ' + apiPunkt + ' funnet'); // eslint-disable-line no-console
    next();
});

exports.startServer = () => {
    app.listen(5554, ()=> console.log("listening on 5554"));	// eslint-disable-line no-console
};

exports.stopServer = () => {
    console.log("stopping server"); // eslint-disable-line no-console
};
