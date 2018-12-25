const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id1 = '5c216cf0e62daa03efaa188c';
// //
// // if (!ObjectID.isValid(id)) {
// //   console.log('ID not valid');
// // }
//
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log('Todos', todos);
// // });
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log('Todo', todo);
// // });
//
// Todo.findById(id1).then(todo => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

var id = '5c1861b78e93b00985d37ff5';

if (!ObjectID.isValid(id)) {
  return console.log('ID not valid');
};

User.findById(id).then(user => {
  if (!user) {
    return console.log('No user found');
  }
  console.log('User By ID', user);
}).catch((e) => console.log(e));
