var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  formId: { type: String, required: true },
  values: { type: Object }
},
  { versionKey: false }
);

module.exports = mongoose.model('Submission', SubmissionSchema);