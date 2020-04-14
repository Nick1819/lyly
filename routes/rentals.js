const express = require('express');
const rentals = express.Router(); 
const mongoose = require('mongoose');
const { MovieSchema }  = require('../models/movies');
const { Customers } = require('../models/customers');


rentals.get('/', async (req, res) => {
    const movie_listed = await MovieSchema
        .find()
        .select({
            title: 1,
            //_id: 1
        });
    
    res.send(movie_listed);
});

//----------------------------------------//
/*
Posting structure: 
{
    "name": 
    "isGold": 
    "phone": 
    "title": 
    "quantity":
}
*/

rentals.post('/', async (req, res) => {
    const film = await MovieSchema
        .find(
            title = req.body.title
        );
    
    const user = await Customers
        .find(
            name = req.body.name
        );

    if (!film) res.status(400).send('Bad Request'); 

    if (film.numberInStock == 0) res.send('There is none in stock'); 


    const number = film.numberInStock - 1; 
    try {
        const user_results = await Customers.updateOne({_id: user._id}, {
            $set: {
                Film_in_rent: new mongoose.Schema({
                    name: film.title, 
                    quantity: req.body.quantity,
                }),
                date_in: "today",
                date_out: "tommorow"
            }
        });
        const film_result = await MovieSchema.updateOne({_id: film._id }, {
            $set: {
                numberInStock = number
            }
        });
        if ((film_result)&&(user_results)) res.send(`Successfully rented ${film.title}`);
    }
    catch (err) {
        res.send('Something went wrong', err);
    }
    
    //making_rental(posting, req.body.name, req.body.isGold, req.body.phone);
});


module.exports = rentals;