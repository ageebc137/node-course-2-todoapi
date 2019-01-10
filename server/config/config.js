let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else if(env === 'production'){
  process.env.MONGODB_URI = 'mongodb://rickmortc137:Airaledn90!@ds145304.mlab.com:45304/nodetodoapi';
}