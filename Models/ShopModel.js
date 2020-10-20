const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     photoURL: {
          type: String,
          required: true,
     },
     shopType: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;