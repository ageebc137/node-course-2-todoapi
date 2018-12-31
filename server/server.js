let env = process.env.NODE_ENV || 'development';
console.log('env ****', env)

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}else if(env === 'production'){
  process.env.MONGODB_URI = 'mongodb://rickmortc137:Airaledn90!@ds145304.mlab.com:45304/nodetodoapi'
}

console.log(process.env.MONGODB_URI);

let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((err) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })


});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
