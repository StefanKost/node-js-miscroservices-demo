'use strict';

const mongoose = require('mongoose');
const config = require('config');

const connectUri = config.get('database.url');
mongoose.Promise = global.Promise;
const db = mongoose.connect(connectUri, { useMongoClient: true });

module.exports.register = (server, options, next) => (
  db.then(() => next(), next)
);

module.exports.register.attributes = {
  name: 'mongo-db-connect',
  version: '1.0.0',
};
