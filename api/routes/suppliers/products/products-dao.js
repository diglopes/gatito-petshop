const Model = require("./product-model");
const ReviewModel = require("./reviews/review-model")
const Sequelize = require("sequelize")

const reviewsAggregation = {
  attributes: [
    "id",
    "titulo",
    "preco",
    "estoque",
    "idFornecedor",
    "data_criacao",
    "data_atualizacao",
    "versao",
    [Sequelize.fn("AVG", Sequelize.col("avaliacaos.nota")), "mediaAvaliacoes"],
    [Sequelize.fn("COUNT", Sequelize.col("avaliacaos.id")), "numAvaliacoes"]
  ],
  include: {
    model: ReviewModel,
    attributes: []
  }
}

class ProductsDAO {
  constructor(model = Model) {
    this.model = model;
  }

  index(supplierId) {
    return this.model.findAll({
      raw: true,
      where: { idFornecedor: supplierId },
      group: ["produto.id"],
      ...reviewsAggregation
    });
  }

  create(newProduct = {}) {
    return this.model.create(newProduct)
  }

  findById(id) {
    return this.model.findOne({ 
      where: { id },
      group: ["produto.id"],
      ...reviewsAggregation
    })
  }

  remove(id, supplierId){
    return this.model.destroy({
      where: {
        id,
        idFornecedor: supplierId
      }
    })
  }
}

module.exports = ProductsDAO;
