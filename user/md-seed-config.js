'use strict';

const mongooseLib = require('mongoose');
const config = require('config');

const createUsers = require('./seeders/2018-07-15-create-users.seeder');

module.exports = {
  // Export the mongoose lib
  mongoose: mongooseLib,
  // Export the mongodb url
  mongoURL: config.get('database.url'),
  /*
      Seeders List
      ------
      order is important
    */
  seedersList: {
    createUsers
  }
};
