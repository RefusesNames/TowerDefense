const gulp = require('gulp');
const typescript = require('gulp-typescript');
const project = typescript.createProject('tsconfig.json');

gulp.task('build', function(){
  return gulp.src('html/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('typescript', function(){
	return project.src()
		.pipe(project())
		.js.pipe(gulp.dest('dist'));
});
