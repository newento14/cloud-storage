const e = require("express");
module.exports = class ServerError extends Error{
  status;
  error;

  constructor(status, message, error = []) {
    super(message);
    this.status = status;
    this.error = error;
  }

  static UnauthorizedError() {
    return new ServerError(401, "User not authorized");
  }

  static BadRequest(message, error = []) {
    return new ServerError(400, message, error);
  }
}