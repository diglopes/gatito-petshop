const suppliersTableModel = require("../routes/suppliers/table-model")

suppliersTableModel
  .sync()
  .then(() => console.log("Suppliers table created"))
  .catch(console.log)