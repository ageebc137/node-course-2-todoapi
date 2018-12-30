const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}).then(() => {
  console.log('Connected to Database')
}).catch(err => {
  console.log("not connected to database!", err);
});
// 'mongodb://localhost:27017/TodoApp'
// 'mongodb://rickmortc137:Airaledn90!@ds145304.mlab.com:45304/nodetodoapi'
module.exports = {mongoose};
