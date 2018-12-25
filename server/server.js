let express = require('express');
let bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    (res.status(400).send(e));
  });
});

//GET /todos/12345
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //Valid id using isValid
    //404 - send back empty send
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

  //findById
  //success
    //if todo - send it back
    //if no todo - send bac, 404 with empty body
  //error
    //400 - and send empty body back


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
