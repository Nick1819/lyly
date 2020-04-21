const express = require('express');
const error_handler = require('../middleware/error_handler');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrytc = require('bcrypt');
const login = express.Router();
const mongoose = require('mongoose');
const { validateLogin } = require('../models/login');
const { User } = require('../models/users');

login.post('/', error_handler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) res.status(404).send('Please type in your info again');

    const user = await User.findOne({username: req.body.username});
    if (!user) res.send('Wrong username or password, plz input again');


    const validPassword = await bcrytc.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid Password'); 
    
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(`Welcome ${user.username}`);

}));

module.exports = login;