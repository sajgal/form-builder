'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Form = require('../models/Form.model');

mongoose.connect('mongodb://mongodb:27017', {useNewUrlParser: false});

// Get all forms
router.get('/forms', function(req, res, next) {
  Form.find()
    .then(function(data) {
      res.json(data);
    });
});

// Get single form
router.get('/forms/:id', function(req, res, next) {
  var _id = req.params.id;
  Form.findById(_id, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      res.json(data);
    }
  });
});

// Add new form
router.post('/forms', function(req, res, next) {
  req.accepts('application/json');
  var form = {
    name: req.body.name,
    fields: req.body.fields
  };

  var data = new Form(form);
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
