const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

function validateLogin(login) {
    const schema = Joi.object ({
        password: Joi.string().required().trim(),
        username: Joi.string().required().trim()
    });

    return schema.validate(login);
}

module.exports.validateLogin = validateLogin;