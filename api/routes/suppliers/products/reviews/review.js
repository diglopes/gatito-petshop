const ReviewDAO = require("./reviews-dao");

const reviewDao = new ReviewDAO()

class Review {
    constructor({
        id,
        titulo,
        descricao,
        nota,
        idProduto,
        data_criacao,
        data_atualizacao,
        versao
    }) {
        Object.assign(this, {
            id,
            titulo,
            descricao,
            nota,
            idProduto,
            data_criacao,
            data_atualizacao,
            versao
        })
    }

    async create() {
        const { titulo, descricao, nota, idProduto } = this
        const result = await reviewDao.create({ titulo, descricao, nota, idProduto})
        Object.assign(this, result)
    }
}

module.exports = Review