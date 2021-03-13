const Serializer = require("./serializer");

class ProductsSerializer extends Serializer {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      "id",
      "titulo",
      "preco",
      "numAvaliacoes",
      "mediaAvaliacoes"
    ];
    this.xmlWrapperTag = "produtos";
    this.xmlItemTag = "produto";
  }
}

module.exports = ProductsSerializer;
