var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var http = require('http');
var less = require('gulp-less');
var path = require('path');
var express = require('express');
var runSequence = require('run-sequence');
var del = require('del');
var notify = require("gulp-notify");
var livereload = require('gulp-livereload');
var manifest = require('gulp-manifest');

var paths = {
    src     : './src',
    dest    : './dist',
    scripts : ['./src/js/**/*.{js,jsx}'],
    styles  : ['./src/styles/**/*.less'],
    statics : ['./src/{fonts,images,vendor}/**/*.*','./src/index.html']
};


/*  Compilation and File Processing  */

gulp.task('scripts', function() {

    return browserify({
        entries: paths.src+'/js/index.js',
        debug: true
    })
        .transform(babelify.configure({
            optional: ["es7.asyncFunctions","es7.classProperties"]
        }))
        .bundle()
        .on('error',notify.onError("Error: <%= error.message %>"))
        .pipe(source('main.js'))
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(livereload())
        .pipe(notify("Built Scripts!"));
});

gulp.task('styles', function () {

    return gulp.src(paths.src+'/styles/styles.less')
        .pipe(less({}))
        .on('error',notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(paths.dest+'/styles'))
        .pipe(livereload())
        .pipe(notify("Built Styles!"));
});

gulp.task('statics', function () {
    return gulp.src(paths.statics, {buffer:false})
        .on('error',notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
});


gulp.task('manifest', function(){
    return gulp.src([paths.dest + '/**'])
        .pipe(manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe(gulp.dest(paths.dest));
});


/*  Watches  */

gulp.task('watch', ['build','server'], function() {
    livereload.listen();
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.statics, ['statics']);
    //gulp.watch(paths.dest+'/**', ['manifest']).on('change',livereload.changed);

});


/* CleanUp */

gulp.task('clean', function (cb) {
    del([paths.dest], cb);
});


/* Builds */

gulp.task('build', function(callback) {
    runSequence('clean', ['scripts','styles', 'statics']/*, ['manifest']*/, callback);
});



/* Static Server */

gulp.task('server', function(done) {
    var app = express();
    var port = 3000;
    app.use(express.static(path.join(__dirname, './dist')));
    app.use('/temp',express.static(path.join(__dirname, 'temp')));
    app.listen(port, function(){
        console.log('development server listening on port ' + port);
    });
    done();
});



/* Build Everything */
gulp.task('default',['build']);
