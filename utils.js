// this is created to send custom error messages to the client
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // marking all the errors occured in the app as operation,so it will look different from the error occured in any library
    this.isOperational = true;

    // we created stack trace property which tells Location in code at which Error.captureStackTrace() was called.
    // pass the 2nd argument it will hide the error implementation details
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
