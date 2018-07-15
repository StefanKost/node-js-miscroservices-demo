'use strict';

const { User } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/api/user/{id}',
  config: {
    description: 'Get user by id',
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      }
    },
    handler(req, reply) {

      return User.findById(req.params.id)
        .then(user => !!user ? reply(user) : reply({ message: "User not found" }).code(404))
        .catch(err => reply(err));
    }
  }
};
