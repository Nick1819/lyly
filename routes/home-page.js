const express = require('express');
const home = express.Router(); 

home.get('/', (req, res) => {
    res.send('Hallo, Welcome to Lyly'); 
    res.end();
})

module.exports = home;