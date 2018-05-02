var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cp = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site - for windows. If you are on a Mac/linux change jekyll.bat to just jekyll
 */

gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload when watched files change
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});


// Static Server + watching scss/html files
// gulp.task('serve', ['watch-sass'], function() {
gulp.task('serve', ['jekyll-build'], function() {

    browserSync.init({
        server: "_site/"
    });

});

/**
 * Rebuild Jekyll & do page reload when watched files change
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('watch', function() {

    // gulp.watch('_assets/sass/**/*.scss', ['watch-sass']);
    // gulp.watch(['**/*.*', '!_site/**/*', '!_assets/**/*', '!node_modules/**/*', '!.sass-cache/**/*']).on('change', browserSync.reload);
    gulp.watch(['**/*.*', '!_site/**/*', '!_assets/**/*', '!node_modules/**/*', '!.sass-cache/**/*'], ['jekyll-rebuild']);

});





gulp.task('watch-sass', function() {
    gulp.src("_assets/sass/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.stream());
});
// gulp.task('images-rebuild', function(cb) {

//     gulp.src('_assets/img/**/*.*')
//         .pipe(gulp.dest('_site/assets/img/'))
//         .pipe(browserSync.stream());
// });

//Watch task
// gulp.task('default',function() {
//     gulp.watch('sass/**/*.scss',['watch-sass']);
// });
// gulp.task('default', ['serve']);
gulp.task('default', ['serve', 'watch','watch-sass']);