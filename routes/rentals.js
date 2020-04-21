const express = require('express');
const auth = require('../middleware/auth');
const rentals = express.Router(); 
const mongoose = require('mongoose');
const { Movies }  = require('../models/movies');
const { Customers } = require('../models/customers');


rentals.get('/', async (req, res) => {
    const movie_listed = await Movies
        .find()
        .select({
            title: 1,
            _id :0, 
            numberInStock: 1
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

rentals.post('/',auth, async (req, res) => {
    const film = await Movies.find({title : req.body.title});
    if (!film[0]) return res.status(400).send('Bad Request, not correct film name'); 
    
    const user = await Customers.find({name : req.body.name});
    if (film[0].numberInStock == 0) return res.send('There is none in stock');   

    const number = film[0].numberInStock - req.body.quantity; 
    const user_results = await Customers.updateOne({_id: req.user._id}, {
        $set: {
            Film_in_rent: {
                name: film[0].title, 
                quantity: req.body.quantity,
            },
            date_in: "today",
            date_out: "tommorow"
        }
    });
    
    const film_result = await Movies.updateOne({_id: film[0]._id }, {
        $set: {
            numberInStock : number
        }
    });
    if ((film_result)&&(user_results)) res.send(`Successfully rented ${film[0].title}`);

    //making_rental(posting, req.body.name, req.body.isGold, req.body.phone);
});


module.exports = rentals;