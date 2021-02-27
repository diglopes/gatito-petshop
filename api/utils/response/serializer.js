const UnsupportedValueError = require("../../errors/unsupported-value");
const contentTypeEnum = require("../content-type-enum");
const headersEnum = require("../headers-enum");
const json2xml = require("jsontoxml")

class Serializer {
  constructor() {
    this.xmlWrapperTag = "data"
    this.xmlItemTag = "item"
  }

  _json(data) {
    return JSON.stringify(data);
  }

  _xml(data) {
    let tag = this.xmlItemTag
    if(Array.isArray(data) ) {
      tag = this.xmlWrapperTag
      data = data.map(item => ({ [this.xmlItemTag]: item }))
    }
    return json2xml({ [tag]: data })
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
    if (Array.isArray(data)) {
      return data.map(this._filterItem.bind(this));
    } else {
      return this._filterItem(data);
    }
  }

  serialize(data) {
    const filteredData = this._filter(data);
    const { JSON, ALL, XML } = contentTypeEnum;
    if (this.contentType === JSON || this.contentType === ALL) {
      return this._json(filteredData);
    }

    if (this.contentType === XML) {
      return this._xml(filteredData);
    }

    throw new UnsupportedValueError(this.contentType, headersEnum.ACCEPT);
  }

  addPublicFields(fields) {
    if (Array.isArray(fields)) {
      this.publicFields.push(...fields);
    } else {
      this.publicFields.push(fields);
    }
  }
}

module.exports = Serializer;
