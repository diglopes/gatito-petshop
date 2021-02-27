const UnsupportedValueError = require("../../errors/unsupported-value");
const contentTypeEnum = require("../content-type-enum");
const headersEnum = require("../headers-enum");

class Serializer {
  _json(data) {
    return JSON.stringify(data);
  }

  _filterItem(data) {
    const filteredData = {};
    this.publicFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        filteredData[field] = data[field];
      }
    });
    return filteredData;
  }

  _filter(data) {
    if(Array.isArray(data)) {
      return data.map(this._filterItem.bind(this))
    } else {
      return this._filterItem(data);
    }
  }

  serialize(data) {
    const filteredData = this._filter(data)
    if (
      this.contentType === contentTypeEnum.JSON ||
      this.contentType === contentTypeEnum.ALL
    ) {
      return this._json(filteredData);
    }

    throw new UnsupportedValueError(this.contentType, headersEnum.ACCEPT);
  }

  addPublicFields(fields) {
    if(Array.isArray(fields)) {
      this.publicFields.push(...fields)
    } else {
      this.publicFields.push(fields)
    }
  }
}

module.exports = Serializer;
