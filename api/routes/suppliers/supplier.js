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
    this._validate()
    const { empresa, categoria, email } = this
    const result = await suppliersTable.create({ empresa, categoria, email });
    Object.assign(this, result.dataValues)
  }

  async load() {
    const result = await suppliersTable.findById(this.id)
    Object.assign(this, result.dataValues)
  }

  async update() {
    await suppliersTable.findById(this.id)
    const fields = ["empresa", "email", "categoria"]
    const dataToUpdate = {}
    fields.forEach(field => {
      const value = this[field]
      if(value && typeof value === "string") {
        dataToUpdate[field] = value
      }
    })
    if(!Object.keys(dataToUpdate).length) {
      throw new Error("Não foram fornecidos dados válidos para atualizar o registro")
    }
    await suppliersTable.update(this.id, dataToUpdate)
  }

  remove() {
    return suppliersTable.remove(this.id)
  }

  _validate() {
    const requiredFields = ["empresa", "email", "categoria"]
    requiredFields.forEach(field => {
      const value = this[field]
      if(!value || typeof value !== "string") {
        throw new Error(`O campo '${field}' está inválido`)
      }
    })
  }
}

module.exports = Supplier;
