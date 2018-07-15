'use strict';

const Hapi = require('hapi');
const config = require('config');

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
    require('./plugins/dbConnect'),
    require('./plugins/routersLoader'),
  ])
  .then(server.start.bind(server))
  .then(() => {
    console.info(`${(new Date()).toISOString()} - Server running at: ${server.info.uri}`);
    return server;
  })
  .catch(err => console.error(err));
