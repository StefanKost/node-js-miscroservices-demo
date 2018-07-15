'use strict';

const { User } = require('../../models');
const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/api/user',
  config: {
    description: "Create user",
    tags: ["api"],
    auth: false,
    validate: {
      payload: Joi.object({
        username: Joi.string().min(3).regex(/^[a-z][\w]{2,}$/i).required(),
        email: Joi.string().email().lowercase({ forse: true }).required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        age: Joi.number(),
        aboutMe: Joi.string(),
      })
    },
    handler(req, reply){

      return User.create(req.payload)
        .then(result => reply(result).code(201))
        .catch(() => reply({ message: "User already exists!" }).code(409));
    }
  }
};