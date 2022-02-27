const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

const accountRouter = require('./routes/accoutRouter');
const blockRouter = require('./routes/blockRouter');
const txRouter = require('./routes/txRouter');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

// Test code
app.use('/account', accountRouter);
app.use('/block', blockRouter);
app.use('/tx', txRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(PORT, ()=>{
  console.log('Server Start!!');
})
