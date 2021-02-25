const suppliersTable = require("./table");

class Supplier {
  constructor({
    id,
    empresa,
    categoria,
    email,
    data_criacao,
    data_atualizacao,
    versao,
  }) {
    Object.assign(this, {
      id,
      empresa,
      email,
      categoria,
      data_criacao,
      data_atualizacao,
      versao,
    }, {});
  }

  async create() {
    const { empresa, categoria, email } = this
    const result = await suppliersTable.create({ empresa, categoria, email });
    Object.assign(this, result.dataValues)
  }
}

module.exports = Supplier;
