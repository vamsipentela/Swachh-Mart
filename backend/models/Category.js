const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  quantity: String,
  image: String,
  rating: Number,
  reviews: Number,
  originalPrice: Number,
  discount: Number
}, { _id: false });

const SubcategorySchema = new Schema({
  id: String,
  name: String,
  items: [ItemSchema]
}, { _id: false });

const CategorySchema = new Schema({
  id: String,
  section: String,
  name: String,
  image: String,
  subcategories: [SubcategorySchema]
});

module.exports = mongoose.model('Category', CategorySchema);
