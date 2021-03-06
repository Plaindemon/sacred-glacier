const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Uses the Schema constructor we imported from Mongoose
const PizzaSchema = new Schema({
    // define the fields
    pizzaName: {
        // specific data types
        type: String,
        //  require data to exist for that field
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    //  timestamp field
    createdAt: {
        type: Date,
        // set a default value to the JavaScript Date.now function
        default: Date.now,
        // if no value is provided in this field when the user creates new data, the Date.now function will be executed and will provide a timestamp
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        // option stands for enumerable // a set of data that can be iterated over
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    // indicates an array as the data type
    toppings: [],
    comments: [
        {
          type:Schema.Types.ObjectId,
          // ref property tells the Pizza model which documents to search to find the right comments.
          ref: 'Comment'
          
        }
      ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);
// export the Pizza model
module.exports = Pizza;