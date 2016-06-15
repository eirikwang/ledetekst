const TARGET_DIRECTORY = require('./constants').TARGET_DIRECTORY;

module.exports = {
    clean: (gulp) => (callback) => {
        console.log('Cleaning E2E folders');

        const del = require('del');
        return del([TARGET_DIRECTORY + 'generated-resources/screenshots'], {force: true}, callback)
    },
    e2e:  (gulp) => () => {
        const cliArgs = require('yargs').argv;
        const babel = require('babel-core/register');
        const nightwatch = require('gulp-nightwatch');
        
        gulp.src('integration/*.*')
            .pipe(nightwatch({
                configFile: 'nightwatch.conf.js',
                env: 'default',
                cliArgs
            }));
    }
};