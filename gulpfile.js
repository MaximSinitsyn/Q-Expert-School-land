var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	svgInject 		= require('gulp-svg-inject'),
	htmlPartial 	= require('gulp-html-partial'),
	concat       	= require('gulp-concat'),
    uglify       	= require('gulp-uglifyjs'),
    cssnano      	= require('gulp-cssnano'),
    rename       	= require('gulp-rename'),
    del          	= require('del'),
    imagemin     	= require('gulp-imagemin'),
    pngquant     	= require('imagemin-pngquant'),
    cache        	= require('gulp-cache'),
    autoprefixer 	= require('gulp-autoprefixer'),
	browserSync  	= require('browser-sync'),
	babel 			= require('gulp-babel');



let PATH = {
	'css_libs': [
		'app/libs/uikit-2.26.4/css/uikit.css',
		'app/scss/**/*.scss'
	],
	'js_libs': [
		'bower_components/jquery/dist/jquery.js',
		'app/libs/uikit-2.26.4/js/uikit.js',
		'app/js/**/*.js'
	],
	'fonts': [
		'app/fonts/**/*.*'
	]
};	

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('scss', function() {
    gulp.src(PATH.css_libs)
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
   		.pipe(gulp.dest('dist/css'))
        // .pipe(browserSync.reload({stream: true}))
});	

gulp.task('scripts', function() {
    gulp.src(PATH.js_libs)
        .pipe(babel())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        // .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    gulp.src(['app/*.html'])
        .pipe(htmlPartial({
            basePath: 'app/partials/'
        }))
        .pipe(svgInject())
        .pipe(gulp.dest('dist'))
        // .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
	gulp.src(PATH.fonts)
    	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('watch', ['clean', 'img', 'html', 'scss', 'scripts', 'fonts'], function() { //'browser-sync', 
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);