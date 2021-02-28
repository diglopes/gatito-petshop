const Model = require("./product-model");

class ProductsDAO {
  constructor(model = Model) {
    this.model = model;
  }

  index(supplierId) {
    return this.model.findAll({
      raw: true,
      where: { idFornecedor: supplierId },
    });
  }

  create(newProduct = {}) {
    return this.model.create(newProduct)
  }
}

module.exports = ProductsDAO;
