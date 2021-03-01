const InvalidFieldError = require("../../../errors/invalid-field")
const ProductsDAO = require("./products-dao")

const productDAO = new ProductsDAO()

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

    _validate() {
        const { titulo, preco, estoque } = this
        if(!titulo || typeof titulo !== "string") {
            throw new InvalidFieldError("titulo")
        }
        if(!preco || typeof preco !== "number") {
            throw new InvalidFieldError("preco")
        }
        if(typeof estoque !== "number") {
            throw new InvalidFieldError("estoque")
        }
    }

    async create() {
        this._validate()
        const { titulo, preco, idFornecedor, estoque } = this
        const result = await productDAO.create({ titulo, preco, idFornecedor, estoque})
        Object.assign(this, result.dataValues)
    }

    async load() {
        const result = await productDAO.findById(this.id)
        Object.assign(this, result.dataValues)
    }

    async remove() {
        return productDAO.remove(this.id, this.idFornecedor)
    }
}

module.exports = Product