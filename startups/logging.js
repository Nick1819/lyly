const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    // or use winston.transport.console => write into file
    process.on('unhandledRejection', (ex) => {
        console.log('We got an unhandledException');
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.File({filename: 'logfile.log'}));

    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/lyly',
        options: {
            useUnifiedTopology: true,
        }
    }));

}