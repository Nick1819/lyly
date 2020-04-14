const express = require('express'); 
const movies = express.Router(); 
const mongoose = require('mongoose');
const { MovieSchema  } = require('../models/movies');
const { FilmGenre, filmSchema } = require('../models/genres');
const Joi = require('@hapi/joi');


movies.get("/get", async (req, res) => { 
    try { 
        const result = await MovieSchema.find();
        res.send(result);
    }
    catch (err) { 
        console.error('Cannot display movie list', err);
        res.send("Unavailable");
    }
});

movies.post("/post", async (req, res) => {
    try { 
        const string_id = req.body.genres._id;
        //res.send(string_id);
        const f_genre = await FilmGenre.findById(string_id);
        if (!f_genre) return res.status(400).send('Invalid genre.');
        //res.send(f_genre);
        let temp = new MovieSchema({
            title: req.body.title, 
            genres: {
                query_id: string_id,
                genre: req.body.genres.genre
            }, 
            numberInStock: req.body.numberInStock, 
            dailyRentalRate: req.body.dailyRentalRate
        });
        const result = await temp.save();
        res.send(result);
    }
    catch (err) {
        console.error('cannot create new film', err);
    }
});

module.exports = movies;

