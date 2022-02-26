const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = 3000;

const accountRouter = require('./routes/accoutRouter');
const blockRouter = require('./routes/blockRouter');
const txRouter = require('./routes/txRouter');

// view engine setup
app.use(logger('dev'));
app.use(express.json());

// Test code
app.use('/account', accountRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);

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
