var gulp = require('gulp'),//引入gulp包，调用gulp命令
    $ = require('gulp-load-plugins')();//引入gulp加载的所有插件（需要本地安装依赖所用到的插件）


/* 压缩css */
gulp.task('mincss',function () {
    gulp.src('./src/css/*.css')
    .pipe($.cleanCss())
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/css'))
})

/* 压缩js */
gulp.task('minjs',function () {
    gulp.src('./src/js/*.js')
    .pipe($.uglify())
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js'))
})

/* 压缩html */
gulp.task('minhtml',function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./src/*.html')
    .pipe($.htmlmin(options))
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist'))
})

/* 定义livereload任务 */
gulp.task('connect',function () {
    $.connect.server({
        root:'src',
        port: 8888,
        livereload:true
    })
})

/* html保存刷新 */
gulp.task('html',function () {
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./src'))
    .pipe($.connect.reload());
})

/* 编译sass并保存刷新 */
gulp.task('sass',function () { 
    gulp.src('./src/sass/*.scss')
    .pipe($.sass())
    .pipe(gulp.dest('./src/css'))
    .pipe($.connect.reload());
});

/* js保存刷新 */
gulp.task('js',function () {
    gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./src/js'))
    .pipe($.connect.reload());
})

/* 监听文件 */
gulp.task('watchAll',function () {
    gulp.watch('./src/sass/*.scss',['sass'])//监听路劲下的所有文件，一发生改变就执行所指向的任务
    gulp.watch('./src/*.html',['html'])
    gulp.watch('./src/js/*.js',['js'])
});

gulp.task('default',['connect','watchAll']);