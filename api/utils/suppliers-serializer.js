const Serializer = require("./serializer");

class SuppliersSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
    }
}

module.exports = SuppliersSerializer