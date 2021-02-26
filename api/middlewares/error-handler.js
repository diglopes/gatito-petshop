const InsufficientDataError = require("../errors/insufficient-data");
const InvalidFieldError = require("../errors/invalid-field");
const NotFoundError = require("../errors/not-found");

module.exports = (err, req, res, next) => {
    let status = 500
    if (err instanceof NotFoundError) status = 404
    if (err instanceof InvalidFieldError || err instanceof InsufficientDataError) {
      status = 400
    }

    res.status(status).json({ error: { msg: err.message, id: err.idError }});
}