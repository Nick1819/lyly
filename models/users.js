const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const JoiComplex = require('joi-password-complexity');

const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 3,
    symbol: 2,
    requirementCount: 6,
  };

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        maxlength : 50, 
        minlength : 3, 
        required : true
    }, 
    username: {
        type: String, 
        maxlength: 50, 
        minlength:5,
        required: true, 
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        minlength: 5, 
        require: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true
    },
    address: { 
        type: String,
        required: true
    },
    isAdmin: Boolean
}); 


userSchema.methods.generateAuthToken = function () { 
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}


function validateUser(user) {
    const schema = Joi.object ({
        name: Joi.string().max(255).required(), 
        gender: Joi.string().required(), 
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
        password: JoiComplex(complexityOptions),
        address: Joi.string().required(),
        username: Joi.string().required()
    })
    //Joi schema, not normal Schema

    return schema.validate(user);
}

const User = mongoose.model('users', userSchema);


module.exports.User = User; 
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;