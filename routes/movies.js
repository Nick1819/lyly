const express = require('express'); 
const movies = express.Router(); 
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Movies } = require('../models/movies');
const { FilmGenre, filmSchema } = require('../models/genres');
const error_handler = require('../middleware/error_handler');
const Joi = require('@hapi/joi');


movies.get("/", async(req, res) => { 
    const result = await Movies.find().select({
        title: 1,
        _id: 0,
    });
    res.send(result);
});

movies.post("/", async(req, res) => { 
    //res.send(string_id);
    const film = await Movies
        .findOne({title: req.body.title});
       
    if (film) res.send('Already have in stock');
        
    let temp = new Movies({
        title: req.body.title, 
        genres: req.body.genre,
        numberInStock: req.body.numberInStock, 
        dailyRentalRate: req.body.dailyRentalRate
    });
    const result = await temp.save();
    res.send(result); 
});

module.exports = movies;

