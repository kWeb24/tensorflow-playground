/* eslint-disable */

let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.options({ processCssUrls: false });

mix.setPublicPath('./');

mix.sass('./src/scss/styles.scss', 'public/dist/css/').options({
  autoprefixer: {
    options: {
      browsersList: ['last 6 versions'],
    },
  },
});

mix.js(['./src/js/Core.js'], 'public/dist/js/app.js').sourceMaps();
