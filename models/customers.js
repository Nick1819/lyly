const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: Boolean, 
    name: {
        type: String,
        minlength: 5, 
        maxlength: 50
    },
    phone: {
        type: String, 
        minlength: 5, 
        maxlength: 5
    },
    Film_in_rent: {
        type: new mongoose.Schema({
            name: {
                type: String, 
                required: true
            },
            quantity: { 
                type: Number, 
                required: true
            }
        }),
        required: true,
    },
    date_in: {
        type: String, 
        required: true
    }, 
    date_out: {
        type: String, 
        required: true
    }
});

const Customers = mongoose.model('customers', customerSchema);

module.exports.Customers = Customers;  