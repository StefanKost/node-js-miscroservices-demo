'use strict';

const { Book } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'DELETE',
  path: '/api/book/{id}',
  config: {
    description: "Delete book",
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      },
    },
    handler(req, reply) {
      const result = Book
        .findById(req.params.id)
        .then(book => book || Promise.reject({ message: "User not found", code: 404 }))
        .then(book => book.remove())
        .then(() => ({
          message: 'Book deleted successfully',
          code: 200,
        }))
        .catch(err => err);

      return result.then(({ message, code }) => reply({ message }).code(code));
    },
  },
};
