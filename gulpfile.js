const gulp=require('gulp');
const sass=require('gulp-sass');


const minify=require('gulp-minify');


gulp.task('css',async()=>{
    console.log('minifying css...');
   return await gulp.src('./assets/scss/**/*.scss')
   .pipe(sass({outputStyle:'compressed'}).on("error",sass.logError))
   .pipe(gulp.dest('./public/assets'))
})

gulp.task('js',()=>{
     return gulp.src('./assets/js/**/*.js')
     .pipe(minify())
     .pipe(gulp.dest('./public/assets'))
})
