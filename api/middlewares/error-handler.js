const InsufficientDataError = require("../errors/insufficient-data");
const InvalidFieldError = require("../errors/invalid-field");
const NotFoundError = require("../errors/not-found");
const UnsupportedValueError = require("../errors/unsupported-value");
const headersEnum = require("../utils/headers-enum");
const ErrorSerializer = require("../utils/response/error-serializer");

module.exports = (err, req, res, next) => {
    let status = 500
    if (err instanceof NotFoundError) status = 404
    if (err instanceof InvalidFieldError || err instanceof InsufficientDataError) {
      status = 400
    }
    if(err instanceof UnsupportedValueError) status = 406
    const serializer = new ErrorSerializer(
      res.getHeader(headersEnum.CONTENT_TYPE)
    )
    res.status(status)
    res.send(serializer.serialize({ id: err.idError, msg: err.message }));
}