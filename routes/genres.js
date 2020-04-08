const express = require('express');
const genres = express.Router();


let movie_genres = [ 
    'Absurd', 
    'Action',
    'Adventure',
    'Animation', 
    'Comedy', 
    'Crime', 
    'Drama', 
    'Fantasy', 
    'Historical', 
    'Historical Fiction', 
    'Horror', 
    'Magic realism', 
    'Mystery', 
    'Paranoid Fiction', 
    'Political', 
    'Romance', 
    'Saga', 
    'Satire', 
    'Science Fiction', 
    'Social', 
    'Speculative', 
    'Thriller', 
    'Urban', 
    'Western'
]

// route: http://lyly.com/genres

genres.get("/", (req, res) => { 
    res.send(movie_genres);
    res.end();
});

module.exports = genres;