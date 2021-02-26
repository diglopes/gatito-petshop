const Model = require("./table-model")

module.exports = {
    index() {
        return Model.findAll()
    },

    create(newSupplier = {}) {
        return Model.create(newSupplier)
    },

    async findById(id) {
       const supplierFound = await Model.findOne({ where: { id } })
       if(!supplierFound) throw new Error("Fornecedor não encontrado")
       return supplierFound
    },

    update(id, data) {
        return Model.update(data, { where: { id } })
    },

    remove(id) {
        return Model.destroy({ where: { id }})
    }
}