'use strict';

const { User } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'DELETE',
  path: '/api/user/{id}',
  config: {
    description: "Delete user",
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      },
    },
    handler(req, reply) {
      const result = User
        .findById(req.params.id)
        .then(user => user || Promise.reject({ message: "User not found", code: 404 }))
        .then(user => user.remove())
        .then(() => ({
          message: 'User deleted successfully',
          code: 200,
        }))
        .catch(err => err);

      return result.then(({ message, code }) => reply({ message }).code(code));
    },
  },
};
