const NotFoundError = require("../../errors/not-found")
const Model = require("./table-model")

module.exports = {
    index() {
        return Model.findAll({ raw: true })
    },

    create(newSupplier = {}) {
        return Model.create(newSupplier)
    },

    async findById(id) {
       const supplierFound = await Model.findOne({ where: { id } })
       if(!supplierFound) throw new NotFoundError("fornecedores", id)
       
       return supplierFound
    },

    update(id, data) {
        return Model.update(data, { where: { id } })
    },

    remove(id) {
        return Model.destroy({ where: { id }})
    }
}