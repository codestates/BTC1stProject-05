const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = 3000;

const usersRouter = require('./routes/users');

// view engine setup
app.use(logger('dev'));
app.use(express.json());

// Test code
app.use('/', (req, res) =>{
  res.send('Hello!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(PORT, ()=>{
  console.log('Server Start!!');
})
