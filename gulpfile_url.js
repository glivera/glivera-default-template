var gulp = require('gulp'), // Сообственно Gulp JS
		jade = require('gulp-jade'), // Плагин для Jade
		sass = require('gulp-sass'), // Плагин для Sass
		csso = require('gulp-csso'), // Минификация CSS
		imagemin = require('gulp-imagemin'), // Минификация изображений
		pngquant = require('imagemin-pngquant'),
		uglify = require('gulp-uglify'), // Минификация JS
		concat = require('gulp-concat'), // Склейка файлов
		connect = require('gulp-connect'),
		open = require('gulp-open');

var assetDir = 'assets/';
var outputDir = 'public/';

gulp.task('reload', function () {
	gulp.src(outputDir+'*.html')
		.pipe(connect.reload());

});

gulp.task('init', function () {
	gulp.src(assetDir+'js/*.js')
		.pipe(gulp.dest(outputDir + 'js'));
	gulp.src(assetDir+'fonts/*.*')
			.pipe(gulp.dest(outputDir + 'fonts'));
	gulp.src(assetDir + 'i/**/*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(outputDir + 'i'));
});

gulp.task('js', function () {
	return gulp.src(assetDir+'js/*.js')
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload());
});

gulp.task('image', function () {
	return gulp.src(assetDir+'i/**/*')
	.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(outputDir + 'i'));
});


gulp.task('watch', function () {
	gulp.watch(outputDir+'*.html', ['reload']);
	gulp.watch(outputDir+'styles/*.css', ['reload']);
	gulp.watch(assetDir+'js/*.js', ['js']);
});

gulp.task('connect', function () {
	connect.server({
		root: outputDir,
		port: 8888,
		livereload: true
	});
});

gulp.task('url', function(){
  var options = {
    url: 'http://localhost:8888',
    app: 'chrome'
  };
  gulp.src(outputDir+'index.html')
  .pipe(open('', options));
});


gulp.task('default', ['init','connect','url','watch']);
