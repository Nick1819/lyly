const express = require('express'); 
const customers = express.Router(); 
const mongoose = require('mongoose');
const { Customers } = require('../models/customers');
// it should have been customers.Customer( { 
//  blah blah blah   
// })
// but when we { xxx,yyy } = require(....)   [if export yy too then just write it] the xxx, and
// yyy become a class/ constructor

customers.get("/get", async (req, res) => {
    try { 
        const result = await Customers.find();
        res.send(result);
    }
    catch (err) {
        console.error('cannot load the data base for customer', err);
        res.send(err);
    }
});

customers.post("/post", async (req, res) => {
    try { 
        const result = await new Customers({
            name: req.body.name, 
            isGold: req.body.isGold,
            phone: req.body.phone
        }).save();
        res.send(result);
        console.log("Done!"); 
    }
    catch (err) { 
        console.error("cannot post the new customer to the database", err); 
        res.send(err);
    }
});

customers.put("/put/:id", async (req, res) => { 
    try { 
        const result = await Customers.updateOne({_id: req.params.id}, {
            $set: {
                name: req.body.name, 
                isGold: req.body.isGold,
                phone: req.body.phone 
            }
        }); 
        console.log("Done!");
        res.send(result);
    }
    catch (err) { 
        console.error("cannot update the database ...", err);
        res.send(err);
    }
});

customers.delete("/delete/:id", async (req, res) => {
    try {
        const result = await Customers.deleteOne({_id: req.params.id});
        console.log("Done!");
        res.send(result);
    }
    catch (err) {
        console.log("cannot delete this shit", err);
        res.send(err);
    }
})

module.exports = customers;