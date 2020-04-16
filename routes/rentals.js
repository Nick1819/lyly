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
        .find({
            title : req.body.title
        });
    
        const user = await Customers
        .find({
            name : req.body.name
        });

    if (!film[0]) return res.status(400).send('Bad Request, not correct film name'); 

    if (film[0].numberInStock == 0) return res.send('There is none in stock');   

    const number = film[0].numberInStock - 1; 

    const user_results = await Customers.updateOne({_id: user[0]._id}, {
        $set: {
            Film_in_rent: {
                name: film[0].title, 
                quantity: req.body.quantity,
            },
            date_in: "today",
            date_out: "tommorow"
        }
    });
    
    const film_result = await MovieSchema.updateOne({_id: film[0]._id }, {
        $set: {
            numberInStock : number
        }
    });
    if ((film_result)&&(user_results)) res.send(`Successfully rented ${film.title}`);

    //making_rental(posting, req.body.name, req.body.isGold, req.body.phone);
});


module.exports = rentals;