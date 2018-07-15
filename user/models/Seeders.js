'use strict';

const mongoose = require('mongoose');
const path = require('path');

const basename = path.basename(module.filename, '.js');
const Schema = mongoose.Schema;

const model = new Schema({
  name: { type: String },
  createdAt: Date,
  updatedAt: Date,
});

model.pre('save', function preHookCallback(next) {
  const currentDate = new Date();

  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

module.exports = mongoose.model(basename, model);