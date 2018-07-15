'use strict';

const { User } = require('../../models');
const _ = require('lodash');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/api/user',
  config: {
    description: 'Get users',
    tags: ['api'],
    auth: false,
    validate: {
      query: Joi.object({
        username: Joi.string().min(3).regex(/^[a-z][\w]{2,}$/i),
        email: Joi.string().email().lowercase({ force: true }),
        firstName: Joi.string(),
        lastName: Joi.string(),
        age: Joi.number(),
        aboutMe: Joi.string(),
        skip: Joi.number(),
        limit: Joi.number(),
      }),
    },
    async handler(req, reply) {

      const query = _.omit(req.query, ['skip', 'limit']);
      const skip = _.get(req, 'query.skip', 0);
      const limit = _.get(req, 'query.limit', 10);

      try {
        const [ results, count ] = await Promise.all([
          User.find(query)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
          User.count(query),
        ]);

        return reply(results).header('X-Total-Count', count);
      } catch(err) {
        return reply({ message: 'Database error' }).code(502);
      }

    },
  },
};