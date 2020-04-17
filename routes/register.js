const express = require('express');
const _ = require('lodash');
const register = express.Router(); 
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { userSchema, User, validateUser } = require('../models/users');
const bcrypt = require('bcrypt');

// name, username (nickname, unique), email(unique), password (hash)

register.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //should use findOne instead for ez
    const checkingf = await User.find()
    .or({
        username: req.body.username,
    })
    .select({
        username: 1,
    });
    if (checkingf[0]) res.send('Your username has been used, try a new one'); 

    const checkings = await User.find()
    .or({
        email: req.body.email 
    })
    .select({
        email: 1,
    });
    if (checkings[0]) res.send('Your email has been used, try a new one');
    
    try {
        const user = new User(_.pick(req.body, ['username','email','password','address', 'gender','name']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        if (result) res.send('Register Sucess');
    }
    catch (err) {
        console.error(err);
        res.send(err.message); 
    }
})

module.exports = register;



/*if (!req.body.name) res.send('Please input your name'); 
    if (!req.body.username) res.send('Please input your username');
    if (!req.body.email) res.send('Please input your email');
    if (!req.body.password) res.send('Please input your password');*/