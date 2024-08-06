import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import terser from 'gulp-terser';

const sass = gulpSass(dartSass);

const paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/images'
  }
};

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

export function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}


export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

export async function clean() {
  return deleteAsync(['dist']);
}

const build = gulp.series(clean, gulp.parallel(styles, images, scripts), watch);

export { build as default };
