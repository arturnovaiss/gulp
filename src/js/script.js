console.log('Olá, mundo!');

const del = require('del');

async function clean() {
  return del(['dist']);
}

const build = gulp.series(clean, gulp.parallel(styles, images, scripts), watch);

exports.clean = clean;
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;
exports.default = build;
