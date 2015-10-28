'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/todo');

const Todo = mongoose.model('Todo', {title: String});

app.set('view engine', 'jade');
app.use(require('body-parser').json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/api/todos', function (req, res, next) {
  Todo.find()
  .exec(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

app.post('/api/todos', function (req, res, next) {
  var todo = new Todo({title: req.body.title});
  todo.save(function (err) {
    if (err) return next(err);
    res.sendStatus(201);
    console.log(`added ${todo.title}`);
  });
});

app.delete('/api/todos/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err) return next(err);
    res.sendStatus(200);
    console.log(`removed ${todo.title}`);
  });
});

// listen on $PORT or 3000
// this makes the app work on heroku
app.listen(process.env.port || 3000);
console.log(`Server started at localhost:${process.env.port || 3000}`);
