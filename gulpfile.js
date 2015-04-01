var gulp = require('gulp'), // Сообственно Gulp JS
		jade = require('gulp-jade'), // Плагин для Jade
		sass = require('gulp-sass'), // Плагин для Sass
		csso = require('gulp-csso'), // Минификация CSS
		imagemin = require('gulp-imagemin'), // Минификация изображений
		pngquant = require('imagemin-pngquant'),
		uglify = require('gulp-uglify'), // Минификация JS
		concat = require('gulp-concat'), // Склейка файлов
		connect = require('gulp-connect');

var outputDir = 'public';

gulp.task('sass', function () {
	gulp.src('assets/sass/**/*.scss')
			.pipe(sass()) // собираем sass
			.pipe(gulp.dest(outputDir + '/styles/'))
			.pipe(connect.reload()); // записываем css
});

gulp.task('jade', function () {
	gulp.src(['assets/jade/*.jade', '!assets/jade/_*.jade'])
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest(outputDir))
			.pipe(connect.reload());

});

gulp.task('js', function () {
	return gulp.src('assets/js/*.js')
			.pipe(gulp.dest(outputDir + '/js'))
			.pipe(connect.reload());
});

gulp.task('image', function () {
	return gulp.src('assets/i/**/*')
	.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(outputDir + '/i'));
});


gulp.task('watch', function () {
	gulp.watch('assets/jade/*.jade', ['jade']);
	gulp.watch('assets/jade/templates/*.jade', ['jade']);
	gulp.watch('assets/sass/includes/*.scss', ['sass']);
	gulp.watch('assets/sass/*.scss', ['sass']);
	gulp.watch('assets/js/*.js', ['js']);
});

gulp.task('connect', function () {
	connect.server({
		root: outputDir,
		port: 8888,
		livereload: true
	});
});


gulp.task('default', ['js', 'jade', 'sass', 'connect', 'watch']);
