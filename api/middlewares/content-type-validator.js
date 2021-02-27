const UnsupportedValueError = require("../errors/unsupported-value")
const contentTypeEnum = require("../utils/content-type-enum")

module.exports = (req, res, next) => {
    try {
        const formatRequested = req.header("Accept")
        const acceptedFormats = Object.values(contentTypeEnum)
        const isFormatAcceptable = acceptedFormats.includes(formatRequested)
        if(isFormatAcceptable) {
            res.setHeader("Content-Type", formatRequested)
            return next()
        }
        throw new UnsupportedValueError(formatRequested, 'Accept')
    } catch (error) {
        next(error)
    }
}