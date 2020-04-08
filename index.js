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
const server = http.createServer();


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

// Routing API 
lyly.use('/genres', genres);
lyly.use('/', home);






