const UnsupportedValueError = require("../errors/unsupported-value")
const contentTypeEnum = require("../utils/content-type-enum")
const headersEnum = require("../utils/headers-enum")

module.exports = (req, res, next) => {
    try {
        const formatRequested = req.header(headersEnum.ACCEPT)
        const acceptedFormats = Object.values(contentTypeEnum)
        const isFormatAcceptable = acceptedFormats.includes(formatRequested)
        if(isFormatAcceptable) {
            res.setHeader(headersEnum.CONTENT_TYPE, formatRequested)
            return next()
        }
        throw new UnsupportedValueError(formatRequested, headersEnum.ACCEPT)
    } catch (error) {
        next(error)
    }
}