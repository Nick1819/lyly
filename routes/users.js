const express = require('express'); 
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const users = express.Router(); 
const mongoose = require('mongoose');
const { User } = require('../models/users');
// it should have been customers.Customer( { 
//  blah blah blah   
// })
// but when we { xxx,yyy } = require(....)   [if export yy too then just write it] the xxx, and
// yyy become a class/ constructor

users.get('/me',auth, async (req, res) => {
    const user = await User.findById({_id: req.user._id});
    if (!user) res.send(400).send('No User Exist');

    res.send(`Welcome ${user.username}`);
    
});


users.put("/:id",auth, async (req, res) => { 
    try { 
        const result = await User.updateOne({_id: req.user._id}, {
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

users.delete("/:id",[auth,admin], async (req, res) => {
    try {
        const result = await User.deleteOne({_id: req.user_.id});
        console.log("Done!");
        res.send(result);
    }
    catch (err) {
        console.log("cannot delete this shit", err);
        res.send(err);
    }
})

module.exports = users;