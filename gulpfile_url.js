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

var outputDir = 'public';

gulp.task('sass', function () {
	gulp.src('sass/*.scss')
			//.pipe(sass()) // собираем sass
			//.pipe(gulp.dest(outputDir + '/styles/'))
			.pipe(connect.reload()); // записываем css
});

gulp.task('css', function () {
	gulp.src(outputDir+'/styles/*.css')
			//.pipe(sass()) // собираем sass
			//.pipe(gulp.dest(outputDir + '/styles/'))
			.pipe(connect.reload()); // записываем css
});

gulp.task('jade', function () {
	gulp.src(['jade/*.jade', '!jade/_*.jade'])
			//.pipe(jade({
			//	pretty: true
			//}))
			//.pipe(gulp.dest(outputDir))
			.pipe(connect.reload());

});

gulp.task('html', function () {
	gulp.src(outputDir+'/*.html')
			//.pipe(jade({
			//	pretty: true
			//}))
			//.pipe(gulp.dest(outputDir))
			.pipe(connect.reload());

});

gulp.task('js', function () {
	return gulp.src('js/*.js')
			.pipe(gulp.dest(outputDir + '/js'))
			.pipe(connect.reload());
});

gulp.task('image', function () {
	return gulp.src('i/**/*')
	.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest(outputDir + '/i'));
});


gulp.task('watch', function () {
	gulp.watch(outputDir+'/*.html', ['jade']);
	//gulp.watch('jade/templates/*.jade', ['jade']);
	gulp.watch(outputDir+'/styles/*.css', ['css']);
	//gulp.watch('sass/*.scss', ['sass']);
	gulp.watch(outputDir+'js/*.js', ['js']);
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
  gulp.src(outputDir+'/index.html')
  .pipe(open('', options));
});


gulp.task('default', ['connect','url','watch']);
