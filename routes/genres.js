const express = require('express');
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
genres.get("/get", async (req, res) => { 
    const list = await FilmGenre
        .find() 
        .select({
            genre: 1
        })
    res.send(list);
});
// user create new data from the browser
/* post structure: JSON
{
    "genre":
}
*/
genres.post("/post", async (req, res) => {

    temp = new FilmGenre({
        genre: req.body.genre
    });
    try {
        result = await temp.save();
        res.send(result);
    }
    catch (err) {
        console.error('Error occur, cannot post', err);
        res.send('Error');
    }
    
});
// user update new data to the database, ITC: update id user
/* update structure JSON
{
    "genre" : current genre + "0001"
}
*/
genres.put("/put/:id", async (req, res) => {
    try { 
        result = await FilmGenre.updateOne({_id: req.params.id}, {
            $set: {
                genre: req.body.genre
            }
        });
        console.log('Done updating...');
        res.send('Done!');
    }
    catch (err) {
        console.error('Cannot put data ... ', err);
        res.send('Error');
    }
    
}); 

// user delete data, ITC: delete id user
genres.delete("/delete/:id", async (req, res) => {
    try { 
        result = await FilmGenre.deleteOne({_id: req.params.id});
        console.log('Done deleting....');
        res.send('Done!');
    }
    catch (err) {
        console.error('Cannot delete data ....', err);
        res.send('Error');
    }
    
});

module.exports = genres;