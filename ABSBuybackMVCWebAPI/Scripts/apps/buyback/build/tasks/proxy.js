var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create proxy
gulp.task('proxy', ['build'], function (done) {
    browserSync({
        proxy: {
            target: "http://localhost:63778",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});
