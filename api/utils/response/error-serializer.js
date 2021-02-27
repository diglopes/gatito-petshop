const Serializer = require("./serializer");

class ErrorSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
        this.publicFields = ["id", "msg"]
    }
}

module.exports = ErrorSerializer