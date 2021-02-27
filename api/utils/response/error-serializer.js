const Serializer = require("./serializer");

class ErrorSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
        this.publicFields = ["id", "msg"]
        this.xmlWrapperTag = "errors"
        this.xmlItemTag = "error"
    }
}

module.exports = ErrorSerializer