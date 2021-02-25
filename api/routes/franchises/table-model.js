const Sequelize = require("sequelize")
const instance = require("../../database")

const columns = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: "franquias",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
    version: "versao"
}

module.exports = instance.define("franquia", columns, options)