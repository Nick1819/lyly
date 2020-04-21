const helmet = require('helmet');
const compression = require('compression');

module.exports = function(lyly){
    lyly.use(helmet());
    lyly.use(compression());
}
