/* This is not a workplace, this is a playground */
/* | #####   ##  |  ##  |  ####### |   ##   ## |
   | ##  ##  ##  |  ##  |  ##      |   ## ##   |
   | ##    ####  |  ##  |  ##      |   ## ##   |
   | ##      ##  |  ##  |  ####### |   ##   ## |
LICENSED: Me || MIT 

*/ 


const express = require('express');
const morgan = require('morgan');
const Joi = require('@hapi/joi');
const config = require('config');
const http = require('http');
const lyly = express();
const genres = require('./routes/genres');
const home = require('./routes/home-page');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const customers = require('./routes/customers');
const server = http.createServer();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/lyly';

// Set up environemnt variable and system debugging 

lyly.use(express.json()); 
lyly_environment = process.env.NODE_ENV; 
lyly_app_environment = lyly.get('env');

const debug_API = require('debug')('lyly:api');
const debug_DB = require('debug')('lyly:db');

if (lyly_environment === 'development') { 
    console.log('initialization completed'); 
}

lyly.listen(8000, () => console.log(`Listening to port 8000...`));

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log('Connected to the database!'))
    .catch(err => console.error('error occurs', err));


// Routing API 
lyly.use('/genres', genres);
lyly.use('/rentals', rentals );
lyly.use('/movies', movies);
lyly.use('/customers', customers);
lyly.use('/', home);






