const genres = require('../routes/genres');
const home = require('../routes/home-page');
const movies = require('../routes/movies');
const login = require('../routes/login');
const rentals = require('../routes/rentals');
const register = require('../routes/register');
const users = require('../routes/users');
const express = require('express');
const error = require('../middleware/error');

module.exports = function(lyly) {
    // Routing API 
    lyly.use('/login', login);
    //For log-in
    lyly.use('/register', register);
    //For register new user
    lyly.use('/genres', genres);
    //Working with genre: CRUD genre
    lyly.use('/rentals', rentals );
    //Rent film 
    lyly.use('/movies', movies);
    // 
    lyly.use('/users', users);
    // 
    lyly.use('/', home);
    //HomePage

}