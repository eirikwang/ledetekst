const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');

const isProduction = () => process.env.NODE_ENV === 'production';
const constants = require('./gulp/constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;

process.env.NODE_ENV = gutil.env.prod != null ? 'production' : 'development';

gulp.task('build-html', require('./gulp/build-html')(gulp));
gulp.task('build-less', require('./gulp/build-less')(gulp));
gulp.task('build-js', require('./gulp/build-js').buildJs(gulp));
gulp.task('build-vendors', require('./gulp/build-js').buildVendors(gulp));
gulp.task('build-js-watchify', require('./gulp/build-js').buildJsWatchify(gulp));
gulp.task('copy-img', require('./gulp/copy-img').copyImg(gulp));

gulp.task('eslint', require('./gulp/eslint')(gulp));
gulp.task('test', require('./gulp/tests').test(gulp, false));
gulp.task('test-tdd', require('./gulp/tests').test(gulp, true));
gulp.task('tdd', gulp.series('test-tdd', require('./gulp/tests').watch(gulp)));
gulp.task('e2e-clean', require('./gulp/integrationtests').clean(gulp));
gulp.task('e2e', ['e2e-clean'], require('./gulp/integrationtests').e2e(gulp));
gulp.task('start-mock', require('./gulp/mockserver').startNode);
gulp.task('stop-mock', require('./gulp/mockserver').stopNode);

gulp.task('build', gulp.series('clean', gulp.parallel('build-js', 'build-vendors', 'build-html')));
gulp.task('build', gulp.series(gulp.parallel('eslint', 'build-js', 'build-vendors', 'build-html', 'build-less', 'copy-img'), 'e2e'));

gulp.task('clean', function (callback) {
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'img/',
        OUTPUT_DIRECTORY + 'index.html'
    ], { 'force': true }, callback);
});

gulp.task('watch', gulp.series('clean', function () {
    process.env.NODE_ENV = 'development';

    gulp.parallel(['build-html', 'build-vendors', 'build-js-watchify', 'build-less', 'copy-img']);
    gulp.watch('./app/**/*.less', gulp.parallel('build-less'));
}));

gulp.task('default', ['clean'], function () {
    gutil.log("-------- Start building for " + (isProduction() ? "production" : "development"));
    gulp.start('build');
});