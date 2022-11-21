const connection = require('../config/connection');
const { User, thoughts } = require('../models');
const { getRandomName, getRandomthoughtss } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await thoughts.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughtss = getRandomthoughtss(10);

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = username.concat('@email.com')
    // const last = fullName.split(' ')[1];

    users.push({
      username,
      email,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);
  await thoughts.collection.insertMany(thoughtss);

  // loop through the saved thoughtss, for each thoughts we need to generate a thoughts response and insert the thoughts responses
  console.table(users);
  console.table(thoughtss);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
