const Sequelize = require("sequelize");
const instance = require("../../../database");
const suppliersTableModel = require("../table-model")

const columns = {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  estoque: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  idFornecedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: suppliersTableModel,
        key: "id"
    }
  }
};

const options = {
  freezeTableName: true,
  tableName: "produtos",
  timestamps: true,
  createdAt: "data_criacao",
  updatedAt: "data_atualizacao",
  version: "versao",
};

module.exports = instance.define("produto", columns, options);
