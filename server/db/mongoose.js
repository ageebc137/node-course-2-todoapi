const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(() => {
  console.log('Connected to Database', process.env.MONGODB_URI)
}).catch(err => {
  console.log("not connected to database!", err);
});
// 'mongodb://localhost:27017/TodoApp'
// 'mongodb://rickmortc137:Airaledn90!@ds145304.mlab.com:45304/nodetodoapi'
module.exports = {mongoose};
