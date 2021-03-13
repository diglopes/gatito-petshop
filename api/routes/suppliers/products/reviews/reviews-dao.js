const Model = require("./review-model")

class ReviewDAO {
    constructor(model = Model) {
        this.model = model
    }

    index(productId) {
        return this.model.findAll({
            raw: true,
            where: { idProduto:  productId },
            order: [["data_criacao", 'DESC']]
        })
    }

    create(newProduct = {}) {
        return this.model.create(newProduct)
        .then(entity => entity.get({ plain: true }))
    }
}

module.exports = ReviewDAO