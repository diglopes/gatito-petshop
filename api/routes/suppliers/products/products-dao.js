const Model = require("./product-model");
const ReviewModel = require("./reviews/review-model")
const Sequelize = require("sequelize")
const NotFoundError = require("../../../errors/not-found")

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
      .then(entity => entity.get({ plain: true }))
  }

  async findById(id, supplierId) {
    const product = await this.model.findOne({ 
      where: { id, idFornecedor: supplierId },
      group: ["produto.id"],
      ...reviewsAggregation,
      raw: true
    })
    if(!product) throw new NotFoundError("Produtos", id)
    return product
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
