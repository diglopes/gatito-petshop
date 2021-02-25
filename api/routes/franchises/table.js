const Model = require("./table-model")

module.exports = {
    index() {
        return Model.findAll()
    }
}