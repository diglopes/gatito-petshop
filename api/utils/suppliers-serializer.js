const Serializer = require("./serializer");

class SuppliersSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
        this.publicFields = ["id", "empresa", "categoria"]
    }
}

module.exports = SuppliersSerializer