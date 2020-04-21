const mongoose = require('mongoose');
const { filmSchema } = require('./genres');
const Joi = require('@hapi/joi');


const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 255
    }, 
    genres: {
        type: String, 
        required: true
    }, 
    numberInStock : {
        type: Number,
        required: true
    }, 
    dailyRentalRate: {
        type: Number, 
        required: true
    }
});

function validateMovie(movie) {
    //Joi schema, not normal Schema
    const schema = { 
        title: Joi.string().max(255).required(), 
        genresId: Joi.string().required(), 
        numberInStock: Joi.number().min(0).required(), 
        dailyRentalRate: Joi.number().min(0).required()
    }
}
const Movies = mongoose.model('movies', movieSchema);

module.exports.movieSchema = movieSchema;
module.exports.Movies = Movies;
module.exports.validateMovie = validateMovie;