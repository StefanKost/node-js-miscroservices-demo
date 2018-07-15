'use strict';

const { Book } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'PUT',
  path: '/api/book/{id}',
  config: {
    description: 'Update book by id',
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      },
      payload: {
        title: Joi.string(),
        author: Joi.string(),
        gender: Joi.string().valid('male', 'female'),
        publisher: Joi.string(),
        country: Joi.string(),
      },
    },
    handler(req, reply) {
      const { params: { id }, payload: update } = req;


      return Book.findByIdAndUpdate(id, update, { new: true })
        .then(result => !!result ? reply(result) : reply({ message: "Book not found" }).code(404))
        .catch((err) => reply({ message: err.message }).code(409));
    },
  },
};
