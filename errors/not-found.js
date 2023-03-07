const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-error');

class NotFound extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
