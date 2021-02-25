const Sequelize = require("sequelize");
const instance = require("../../database");

const columns = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.ENUM("ração", "brinquedo"),
    allowNull: false,
  },
};

const options = {
  freezeTableName: true,
  tableName: "fornecedores",
  timestamps: true,
  createdAt: "data_criacao",
  updatedAt: "data_atualizacao",
  version: "versao",
};

module.exports = instance.define("fornecedor", columns, options);
