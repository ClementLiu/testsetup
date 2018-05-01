var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "_site/"
    });

    gulp.watch('_assets/sass/**/*.scss',['styles']);
    gulp.watch(['**/*.*', '!_site/**/*','!_assets/**/*','!node_modules/**/*','!.sass-cache/**/*' ]).on('change', browserSync.reload);
});


gulp.task('styles', function() {
    gulp.src("_assets/sass/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.stream());
});

//Watch task
// gulp.task('default',function() {
//     gulp.watch('sass/**/*.scss',['styles']);
// });
gulp.task('default', ['serve']);