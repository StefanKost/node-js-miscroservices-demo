'use strict';

const { Book } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/api/book',
  config: {
    description: "Create book",
    tags: ["api"],
    auth: false,
    validate: {
      payload: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        gender: Joi.string().valid('male', 'female').required(),
        publisher: Joi.string(),
        country: Joi.string(),
      })
    },
    handler(req, reply){

      return Book.create(req.payload)
        .then(result => reply(result).code(201))
        .catch(() => reply({ message: "Book already exists!" }).code(409));
    }
  }
};