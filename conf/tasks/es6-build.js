/*global require*/
(function buildTask() {
  'use strict';

  const gulp = require('gulp')
    , rollup = require('rollup').rollup
    , rollupJSON = require('rollup-plugin-json')
    , rollupBabel = require('rollup-plugin-babel')
    , paths = require('../paths.json');

  gulp.task('es6-build', ['annotate', 'front-end'], () => {

    rollup({
      'entry': `${paths.lib}js/index.js`,
      'plugins': [
        rollupJSON(),
        rollupBabel({
          'presets': [
            'es2015-rollup'
          ]
        })
      ]
    }).then(bundle => {

      bundle.write({
        'format': 'iife',
        'moduleId': 'npm-ui-ng',
        'moduleName': 'npm-ui-ng',
        'sourceMap': true,
        'dest': `${paths.tmp}/js/index.js`
      });
    });
  });
}());
