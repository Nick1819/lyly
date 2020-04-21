const winston = require('winston');

module.exports = function(err, req, res, next) {
    winston.error(err.message, err);

    // error 
    // warn 
    // info 
    // verbose
    // debug
    // silly

    res.status(500).send('Failure occur at the server, please restart in 5 min');
}