const mongoose = require('mongoose');


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
];

const filmSchema = new mongoose.Schema({
    genre: { 
        type: String, 
        required: true, 
        minlength: 2, 
        maxlength: 50
    }, 
    query_id: {
        type: String, 
        required: true
    }
}) 

const FilmGenre = mongoose.model('filmgenres', filmSchema);

module.exports.filmSchema = filmSchema;
module.exports.FilmGenre = FilmGenre;