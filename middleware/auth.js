const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) { 
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        // return a new variables for req that is user contain id
        // jwt verify a token to return its _id as we sign the _id to the token in models/users
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token.');
    }

}

module.exports = auth;