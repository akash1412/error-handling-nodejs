const express = require('express');
const AppError = require('./utils');

const handleError = require('./errorController');
const app = express();

// middleware ,which will run for all unmatched routes
app.use('/', (req, res, next) => {
  res.send('hi');
});

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

// all errors occured in application will be sent to this middleware
app.use(handleError);

app.listen(4000, () => {
  console.log('server started on http://localhost:4000');
});
