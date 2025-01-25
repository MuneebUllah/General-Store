const mongoose = require('mongoose');

// Define the schema for the array of objects
const shopBillingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  quantity: {
    type: Number,
    required: true, // Quantity is required
    min: 0, // Quantity should not be negative
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price should not be negative
  },
  totalAmount:{
    type:Number,
    default:0
  }
});

// Define the main schema that contains the array of objects
const formSchema = new mongoose.Schema({
  items: {
    type: [shopBillingSchema], // Array of objects based on `itemSchema`
    validate: {
      validator: function (arr) {
        return arr.length > 0; // Ensure the array is not empty
      },
      message: 'Items array must contain at least one object.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically store the creation date
  },
});

// Create the model
const ShopBilling = mongoose.model('Form', formSchema);

module.exports = ShopBilling;
