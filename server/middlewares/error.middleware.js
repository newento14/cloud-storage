const ServerError = require("../exception/serverError")

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ServerError) {
    return res.status(err.status).json({message: err.message, errors: err.error})
  }
  return res.status(500).json({message: "unexpected error"})
}