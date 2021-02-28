const Model = require("./products-model");

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
}

module.exports = ProductsDAO;