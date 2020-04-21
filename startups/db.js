
const winston = require('winston');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/lyly';

module.exports = function() {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>winston.info('Connected to the database!'));
}

mongoose.set('useCreateIndex', true);