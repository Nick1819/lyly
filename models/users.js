const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        maxlength = 50, 
        minlength = 3, 
        required : true
    }, 
    gender: {
        type: String,
        required: true
    },
    age: { 
        type: Number, 
        min: 10, 
        require: false
    }, 
    email: {
        type: String, 
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    isGold: {
        type: Boolean, 
        required: true
    },
    film_in_renting: {
        type: Number
    } 
}); 

const UserSchema = mongoose.model('user', userSchema);


module.exports.UserSchema = UserSchema; 
module.exports.userSchema = userSchema;