/* This is not a workplace, this is a playground */
/* | #####   ##  |  ##  |  ####### |   ##   ## |
   | ##  ##  ##  |  ##  |  ##      |   ## ##   |
   | ##    ####  |  ##  |  ##      |   ## ##   |
   | ##      ##  |  ##  |  ####### |   ##   ## |
LICENSED: Me || MIT 

*/ 

const error = require('./middleware/error');

const express = require('express');
const morgan = require('morgan');
const http = require('http');
const lyly = express();

require('./startups/logging');
require('./startups/routes')(lyly);
require('./startups/db')();
require('./startups/config')();
require('./startups/prod')(lyly);
// Set up environemnt variable and system debugging 

lyly.use(express.json()); 
lyly_environment = process.env.NODE_ENV; 
lyly_app_environment = lyly.get('env');

const debug_API = require('debug')('lyly:api');
const debug_DB = require('debug')('lyly:db');

if (lyly_environment === 'development') { 
    console.log('initialization completed'); 
}

let server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
});

lyly.listen(8000, () => console.log('Listening to port 8000'));
//lyly.listen(8000, () => console.log(`Listening to port 8000...`));

lyly.use(error);




