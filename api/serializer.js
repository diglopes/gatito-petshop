const UnsupportedValueError = require("./errors/unsupported-value");
const contentTypeEnum = require("./utils/content-type-enum");

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

    throw new UnsupportedValueError(this.contentType, "Accept");
  }
}

module.exports = Serializer;
