const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://rickmortc137:Airaledn90!@ds145304.mlab.com:45304/nodetodoapi', {useNewUrlParser: true});

module.exports = {mongoose};
