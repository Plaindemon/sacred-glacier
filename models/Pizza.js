const { Schema, model } = require('mongoose');

// Uses the Schema constructor we imported from Mongoose
const PizzaSchema = new Schema({
    // define the fields
    pizzaName: {
        // specific data types
        type: String
    },
    createdBy: {
        type: String
    },
    //  timestamp field
    createdAt: {
        type: Date,
        // set a default value to the JavaScript Date.now function
        default: Date.now
        // if no value is provided in this field when the user creates new data, the Date.now function will be executed and will provide a timestamp
    },
    size: {
        type: String,
        default: 'Large'
    },
    // indicates an array as the data type
    toppings: []
});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);
// export the Pizza model
module.exports = Pizza;