const express = require('express');
const error_handler = require('../middleware/error_handler');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const genres = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { FilmGenre } = require('../models/genres');

// route: http://lyly.com/genres

async function input_film_genre() { 
    for (let x = 0; x <= movie_genres.length-1; x++) {
        temp = new FilmGenre({
            genre: movie_genres[x]
        })
        try { 
            result = await temp.save();
        }
        catch (err) { 
            console.error('Cannot input genres', err);
        }
    }
} 
// user gets data to the browser
genres.get("/", async(req, res) => { 
    throw new Error('Could not load genres');
    const list = await FilmGenre
        .find() 
        .select({
            genre: 1,
            _id: 0,
        })
    res.send(list);
});
// user create new data from the browser
/* post structure: JSON
{
    "genre":
}
*/
genres.post("/", auth, async (req, res) => {
    temp = new FilmGenre({
        genre: req.body.genre
    });
    const checking = await FilmGenre.find({ genre: req.body.genre }).select({ genre: 1}); 
    if (checking[0]) return res.send('Genre already exits');
    const result = await temp.save(); 

    console.log('Done adding...');
    res.send('Genre added!');
});
// user update new data to the database, ITC: update id user
/* update structure JSON
{
    "genre" : current genre + "0001"
}
*/
genres.put("/:id", auth, async(req, res) => {
    result = await FilmGenre.updateOne({_id: req.params.id}, {
        $set: {
            genre: req.body.genre
        }
    });

    console.log('Done updating...');
    res.send('Done!');
}); 

// user delete data, ITC: delete id user
genres.delete("/:id",[auth, admin], async(req, res) => {
    result = await FilmGenre.deleteOne({_id: req.params.id});

    console.log('Done deleting....');
    res.send('Done!');
});

module.exports = genres;