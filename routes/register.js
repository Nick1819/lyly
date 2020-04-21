const express = require('express');
const _ = require('lodash');
const register = express.Router(); 
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { userSchema, User, validateUser } = require('../models/users');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const error_handler = require('../middleware/error_handler');
// name, username (nickname, unique), email(unique), password (hash)

register.post('/',  async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //should use findOne instead for ez
    const checking = await User.findOne({
        username: req.body.username
    });
    if (checking) res.send('username already exist');
        
    const user = new User(_.pick(req.body, ['username','email','password','address', 'gender','name']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    const token = user.generateAuthToken();
    if (result) res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name']));
});

module.exports = register;



/*if (!req.body.name) res.send('Please input your name'); 
    if (!req.body.username) res.send('Please input your username');
    if (!req.body.email) res.send('Please input your email');
    if (!req.body.password) res.send('Please input your password');*/