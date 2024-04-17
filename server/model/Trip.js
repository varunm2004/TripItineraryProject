const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  }
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;