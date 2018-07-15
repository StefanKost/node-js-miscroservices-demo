'use strict';

const { Book } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/api/book/{id}',
  config: {
    description: 'Get book by id',
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      }
    },
    handler(req, reply) {

      return Book.findById(req.params.id)
        .then(book => !!book ? reply(book) : reply({ message: "Book not found" }).code(404))
        .catch(err => reply(err));
    }
  }
};
