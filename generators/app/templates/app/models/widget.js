/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

var widgetSchema = new Schema({
  product_id: {type: String, required: true, index: true, unique: true},
  name: {type: String, required: true},
  color: {
    type: String, required: true,
    enum: ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black']
  },
  size: {
    type: String, required: true,
    enum: ['Huge', 'Big', 'Medium', 'Small', 'Tiny']
  },
  price: {type: Currency, required: true},
  inventory: {type: Number, required: true, min: 0}
});

widgetSchema.set('timestamps', true); // include timestamps in docs

// apply the mongoose unique validator plugin to widgetSchema
widgetSchema.plugin(uniqueValidator);

// use mongoose currency to transform price
widgetSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.price = Number(ret.price / 100).toFixed(2);
    delete ret.__v; // hide
    delete ret._id; // hide
  }
});

var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
