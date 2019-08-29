'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Submission = require('../models/Submission.model');

mongoose.connect('mongodb://mongodb:27017', {useNewUrlParser: false});

// Get all submissions
router.get('/submissions', function(req, res, next) {
  Submission.find()
    .then(function(data) {
      res.json(data);
    });
});

// Get submission by formId
router.get('/submissions/:formId', function(req, res, next) {
  Submission.find({ formId: req.params.formId }, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      res.json(data);
    }
  });
});

// Add new form Submission
router.post('/submissions', function(req, res, next) {
  req.accepts('application/json');
  var submission = {
    formId: req.body.formId,
    values: req.body.values,
  };

  var data = new Submission(submission);
  data.save(function(err) {
    if (err) {
      console.log({err});
      res.status(500).send();
    } else {
      res.status(201).send(data._id);
    }
  });
});

module.exports = router;
