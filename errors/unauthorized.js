const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-error');

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
