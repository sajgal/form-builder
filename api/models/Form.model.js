var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
  name: { type: String, required: true },
  fields: { type: Array }
},
  { versionKey: false }
);

module.exports = mongoose.model('Form', FormSchema);