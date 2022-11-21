const { connect, connection } = require('mongoose');

connect('mongodb://localhost/developersthoughtss', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
