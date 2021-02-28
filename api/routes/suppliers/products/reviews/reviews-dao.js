const Model = require("./review-model")

class ReviewDAO {
    constructor(model = Model) {
        this.model = model
    }

    index(productId) {
        return this.model.findAll({
            raw: true,
            where: { idProduto:  productId }
        })
    }

    create(newProduct = {}) {
        return this.model.create(newProduct)
    }
}

module.exports = ReviewDAO