'use strict';

const Seeder = require('mongoose-data-seed').Seeder;
const seedersName = '2018-07-15-create-users.seeder';
const { User, Seeders } = require('../models');

const data = [
  {
    username: 'kstef',
    email: 'kostia.stefanovitch@ukr.net',
    firstName: 'Kostya',
    lastName: 'Stefanovitch',
    age: 21,
    aboutMe: 'Hello! My name is Kostya. I\'m full-stack web developer',
  },
  {
    username: 'denisbekh',
    email: 'den.bekh@gmail.com',
    firstName: 'Denis',
    lastName: 'Bekh',
    age: 25,
    aboutMe: 'Welcome to the tutorial by Chandy.',
  },
  {
    username: 'olgashatailo',
    email: 'olgashatailo@gmail.com',
    firstName: 'Olga',
    lastName: 'Shatailo',
    age: 25,
    aboutMe: 'Hi everyone! My name is Olga. I\'m project manager. Have a good day.',
  },
];

const CreateUsers = Seeder.extend({
  shouldRun() {
    return Seeders.count({ name: seedersName })
      .exec()
      .then(count => !(count > 0))
      .catch(() => false);
  },
  run() {

    const tasks = [];

    console.info(`Count users: ${data.length}`);

    data.forEach((item) => {
      tasks.push(User.create(item));
    });

    return Promise.all(tasks)
      .then(() => {
        console.info(' Successfully');
        return Seeders.create({ name: seedersName });
      })
      .catch(err => console.info('Some problems:', err));
  },
});

module.exports = CreateUsers;