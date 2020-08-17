// sending developemnt error
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//sending production error
const sendProdError = (err, res) => {
  // Operational trusted Error sent to the client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // UNKNOWN Programming Error occur,send this generic msg to client

    // 1) log Error

    console.error('Error 💥', err);

    res.status(404).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendDevError(err, res);
  else if (process.env.NODE_ENV === 'production') sendProdError(err, res);
};
