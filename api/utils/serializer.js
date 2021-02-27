const UnsupportedValueError = require("../errors/unsupported-value");
const contentTypeEnum = require("./content-type-enum");
const headersEnum = require("./headers-enum");

class Serializer {
  _json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (
      this.contentType === contentTypeEnum.JSON ||
      this.contentType === contentTypeEnum.ALL
    ) {
      return this._json(data);
    }

    throw new UnsupportedValueError(this.contentType, headersEnum.ACCEPT);
  }
}

module.exports = Serializer

