'use strict';

const Hapi = require('hapi');
const config = require('config');
const H2O2 = require('h2o2');


const server = new Hapi.Server();

server.connection({
  port: config.service.port || 3000,
  routes: {
    cors: {
      additionalExposedHeaders: ['x-total-count'],
    },
  },
});

module.exports = server
  .register([
    H2O2,
    require('./plugins/routersLoader')
  ])
  .then(server.start.bind(server))
  .then(() => {
    console.info(`${(new Date()).toISOString()} - Server running at: ${server.info.uri}`);
    return server;
  })
  .catch(err => console.error(err));