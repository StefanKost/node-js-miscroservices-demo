'use strict';

const Seeder = require('mongoose-data-seed').Seeder;
const seedersName = '2018-07-15-create-books.seeder';
const { Book, Seeders } = require('../models');

const data = [
  {
    title: 'Hairy Maclary from Donaldson\'s Dairy',
    author: 'Lynley Dodd',
    gender: 'female',
    publisher: 'Mallinson Rendel',
    country: 'NZ',
  },
  {
    title: 'Mechanical Harry',
    author: 'Bob Kerr',
    gender: 'male',
    publisher: 'Mallinson Rendel',
    country: 'NZ',
  },
  {
    title: 'My Cat Likes to Hide in Boxes',
    author: 'Lynley Dodd',
    gender: 'female',
    publisher: 'Mallinson Rendel',
    country: 'NZ',
  },
];

const CreateBooks = Seeder.extend({
  shouldRun() {
    return Seeders.count({ name: seedersName })
      .exec()
      .then(count => !(count > 0))
      .catch(() => false);
  },
  run() {

    const tasks = [];

    console.info(`Count books: ${data.length}`);

    data.forEach((item) => {
      tasks.push(Book.create(item));
    });

    return Promise.all(tasks)
      .then(() => {
        console.info(' Successfully');
        return Seeders.create({ name: seedersName });
      })
      .catch(err => console.info('Some problems:', err));
  },
});

module.exports = CreateBooks;