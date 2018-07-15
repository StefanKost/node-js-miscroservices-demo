'use strict';

const { Book } = require('../../models');
const _ = require('lodash');
const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/api/book',
  config: {
    description: 'Get books',
    tags: ['api'],
    auth: false,
    validate: {
      query: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        gender: Joi.string().valid('male', 'female'),
        publisher: Joi.string(),
        country: Joi.string(),
      }),
    },
    async handler(req, reply) {

      const query = _.omit(req.query, ['skip', 'limit']);
      const skip = _.get(req, 'query.skip', 0);
      const limit = _.get(req, 'query.limit', 10);

      try {
        const [ results, count ] = await Promise.all([
          Book.find(query)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
          Book.count(query),
        ]);

        return reply(results).header('X-Total-Count', count);
      } catch(err) {
        return reply({ message: 'Database error' }).code(502);
      }

    },
  },
};