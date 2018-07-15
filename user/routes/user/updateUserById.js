'use strict';

const { User } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'PUT',
  path: '/api/user/{id}',
  config: {
    description: 'Update user by id',
    tags: ["api"],
    auth: false,
    validate: {
      params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId').required(),
      },
      payload: {
        username: Joi.string().min(3).regex(/^[a-z][\w]{2,}$/i),
        email: Joi.string().email().lowercase({ forse: true }),
        firstName: Joi.string(),
        lastName: Joi.string(),
        age: Joi.number(),
        aboutMe: Joi.string(),
      },
    },
    handler(req, reply) {
      const { params: { id }, payload: update } = req;


      return User.findByIdAndUpdate(id, update, { new: true })
        .then(result => !!result ? reply(result) : reply({ message: "User not found" }).code(404))
        .catch((err) => reply({ message: err.message }).code(409));
    },
  },
};
