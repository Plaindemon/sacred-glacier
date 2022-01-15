const { Pizza } = require('../models');

const pizzaController = {
  // the functions will go in here as methods
   // get all pizzas
   getAllPizza(req, res) {
    // serve as the callback function for the GET /api/pizzas route
    // Mongoose .find() method
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
   // get one pizza by id
   // Mongoose .findOne() method to find a single pizza by its _id
   getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({ 
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // createPizza
  // destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides
  createPizza({ body }, res) {
      Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
  },
    // update pizza by id
    updatePizza({ params, body }, res) {
        // Mongoose finds a single document we want to update, then updates it and returns the updated document. If we don't set that third parameter, { new: true }, it will return the original document
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete pizza
    deletePizza({ params }, res) {
        // will find the document to be returned and also delete it from the database
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
 
};

module.exports = pizzaController;