'use strict';

// 引入gulp包， nodejs代码
var gulp = require('gulp'),
  // 引入gulp-sass 包
  sass = require('gulp-sass'),
  // gulp版本定义
  rev = require('gulp-rev'),
  // 替换版本url
  revCollector = require('gulp-rev-collector'),
  // css 压缩
  cleanCss = require('gulp-clean-css'),
  // 兼容处理css3
  autoprefixer = require('gulp-autoprefixer'),
  // css代码map
  sourcemaps = require('gulp-sourcemaps'),
  // js 压缩
  uglify = require('gulp-uglify'),
  // img 压缩
  imgagemin = require('gulp-imagemin'),
  // html 压缩
  minifyHtml = require('gulp-minify-html');

// 样式处理工作流：编译sass → 添加css3前缀 → 压缩css →添加版本号
gulp.task('style', function (e) {
  return gulp.src('./src/sass/**/*.scss') // 读取sass文件
    .pipe(sass()) // 编译sass
    .pipe(autoprefixer({ // 兼容css3
      browsers: ['last 2 versions'], // 浏览器版本
      cascade: true, // 美化属性，默认true
      add: true, // 是否添加前缀，默认true
      remove: true, // 删除过时前缀，默认true
      flexbox: true // 为flexbox属性添加前缀，默认true
    }))
    .pipe(cleanCss({ // 压缩css
      compatibility: 'ie8',
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(rev()) // 文件名加MD5后缀
    .pipe(gulp.dest('./dist/css/')) // 输出目标文件到dist目录
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest('./src/css/')); // 将 rev-manifest.json 保存到 src目录
});

// 替换目标html文件中的css版本文件名，js版本的文件名,html 压缩
gulp.task('html', [
  'style', 'js'
], function (e) {
  return gulp.src(['./src/**/*.json', './dist/**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector({
      replaceReved: true
    })) //- 执行html文件内css文件名的替换和js文件名替换
    .pipe(minifyHtml({
      empty: true,
      spare: true
    }))
    .pipe(gulp.dest('./dist/')); //- 替换后的文件输出的目录
});

// 图片压缩
gulp.task('imgmin', function (e) {
  return gulp.src('./src/img/*.{jpg,gif,ico}')
    .pipe(imgagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片   
      interlaced: true,
      //类型：Boolean 默认：false 隔行扫描gif进行渲染  
       multipass: true       //类型：Boolean
      // 默认：false 多次优化svg直到完全优化 
    }))
    .pipe(gulp.dest('./dist/img'));
});

// js 压缩添加版本
gulp.task('js', function (e) {
  return gulp
    .src(['./src/js/**/*.js'])
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/js/'));
});

var copyPathArr = ['./src/lib/**/*', './src/font/**/*', './src/*.ico'];

// 拷贝gulp文件
gulp.task('copy', function (e) {
  return gulp.src(copyPathArr, {
    base: './src'
  }).pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['style', 'imgmin', 'js', 'copy', 'html']);

// 开发相关
gulp.task('style:dev', function (e) {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css/'));
});

// 开发监控sass文件变化编译sass到css文件 可以增加es6的编译，jslint
gulp.task('dev', function () {
  gulp.watch('./src/sass/**/*.scss', ['style:dev']);
});
