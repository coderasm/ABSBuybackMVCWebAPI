var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a proxy
// at http://localhost:63778
gulp.task('serve-proxy', ['build'], function (done) {
    browserSync({
        proxy: {
            target: "http://localhost:63778", // change to your VS IIS Express setting
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});