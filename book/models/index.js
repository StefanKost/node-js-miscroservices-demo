'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const modelName = path.basename(file, '.js');
    db[modelName] = require(path.join(__dirname, file));
  });

module.exports = db;