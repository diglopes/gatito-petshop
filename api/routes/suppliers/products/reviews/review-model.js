const Sequelize = require("sequelize");
const instance = require("../../../../database");
const productModel = require("../product-model")

const columns = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nota: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0,
        max: 5
    },
    idProduto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: productModel,
            key: "id"
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: "avaliacoes",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
    version: "versao",
};
  
module.exports = instance.define("avaliacao", columns, options);