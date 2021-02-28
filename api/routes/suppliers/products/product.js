const ProductsDAO = require("./products-dao")

const productDao = new ProductsDAO()

class Product {
    constructor({
        id,
        titulo,
        preco,
        estoque = 0,
        idFornecedor,
        data_criacao,
        data_atualizacao,
        versao
    }) {
        Object.assign(this, {
            id,
            titulo,
            preco,
            estoque,
            idFornecedor,
            data_criacao,
            data_atualizacao,
            versao,
        })
    }

    async create() {
        const { titulo, preco, idFornecedor, estoque } = this
        const result = await productDao.create({ titulo, preco, idFornecedor, estoque})
        Object.assign(this, result.dataValues)
    }
}

module.exports = Product