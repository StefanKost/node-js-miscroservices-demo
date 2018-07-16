'use strict';

const Boom = require('boom');
const proxyMap = require('config').get('proxyMap');
const querystring = require('querystring');

const proxyHandler = {
  proxy: {
    mapUri: (req, cb) => {
      let uri = proxyMap[req.route.path];
      if(!uri) { return cb(Boom.notFound()); }

      if( req.params && req.params.id ) {
        uri = uri.replace('{id}', req.params.id);
      }

      if ( Object.keys(req.query).length > 0 ) {
        uri += `?${querystring.stringify(req.query)}`;
      }

      cb(null, uri, req.headers);
    },
    onResponse: (err, res, req, reply) => {
      if (err) { return reply(err); }
      reply(res);
    }
  }
};

exports.register = (server, options, next) => {

  server.route([
    { method: 'GET', path: '/user', handler: proxyHandler },
    { method: 'GET', path: '/user/{id}', handler: proxyHandler },
    { method: 'POST', path: '/user', handler: proxyHandler },
    { method: 'PUT', path: '/user/{id}', handler: proxyHandler },
    { method: 'DELETE', path: '/user/{id}', handler: proxyHandler },
  ]);

  server.route([
    { method: 'GET', path: '/book', handler: proxyHandler },
    { method: 'GET', path: '/book/{id}', handler: proxyHandler },
    { method: 'POST', path: '/book', handler: proxyHandler },
    { method: 'PUT', path: '/book/{id}', handler: proxyHandler },
    { method: 'DELETE', path: '/book/{id}', handler: proxyHandler },
  ]);


  next();
};

exports.register.attributes = {
  name: 'routes-loader-plugin',
  version: '1.0.0',
  multiple: false,
};
