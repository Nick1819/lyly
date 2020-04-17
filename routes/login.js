const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrytc = require('bcrypt');
const login = express.Router();
const mongoose = require('mongoose');
const { validateLogin } = require('../models/login');
const { User } = require('../models/users');

login.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) res.status(404).send('Please type in your info again');
    
    try {
        const Logging = await User
            .find({
                username: req.body.username
            })
            .select({
                username: 1, 
                password: 1,
                _id: 1
            });
        
        if (!Logging[0]) res.send('Wrong username, plz input again');
        const validPassword = await bcrytc.compare(req.body.password, Logging[0].password);

        if (!validPassword) res.status(400).send('Invalid Password'); 
        
        const token = jwt.sign({_id: Logging[0]._id }, config.get('jwtPrivateKey'));
        res.send(token);
    }
    catch (err) { 
        res.send(err);
    }
    
});

module.exports = login;