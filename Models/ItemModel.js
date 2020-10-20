const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = new mongoose.Schema({
     atShop: {
          type: ObjectId,
          ref: "Shop",
     },
     name: {
          type: String,
          required: true,
     },
     photoURL: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     availability: {
          type: Boolean,
          default: true,
          required: true,
     },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;