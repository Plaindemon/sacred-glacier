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
    createdAt: {
        type: Date,
        default: Date.now
      },
      size: {
        type: String,
        default: 'Large'
      },
      toppings: []
});