'use strict';

const glob = require('globby');

/**
 * Casts data to array if it's not yet an array
 * @param {Array|*} arg
 * @returns {Array}
 */
const cast = arg => (
  Array.isArray(arg) ? arg : [arg]
);

exports.register = (server, options, next) => {
  const cwd = options.cwd || process.cwd();

  return glob(cast(options.routes))
    .then((files) => {
      files.forEach((file) => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const route = require(`${cwd}/${file}`);
        server.route(route.default || route);
      });
    })
    .then(() => next())
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

exports.register.attributes = {
  name: 'routes-loader-plugin',
  version: '1.0.0',
  multiple: false,
};

exports.options = {
  routes: 'routes/**/*.js',
};
