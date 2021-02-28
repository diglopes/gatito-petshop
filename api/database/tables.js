const suppliersTableModel = require("../routes/suppliers/table-model");
const franchisesTableModel = require("../routes/franchises/table-model");
const productsTableModel = require("../routes/suppliers/products/table-model")

suppliersTableModel
  .sync()
  .then(() => console.log("Suppliers table created"))
  .catch(console.log);

franchisesTableModel
  .sync()
  .then(() => console.log("Franchises table created"))
  .catch(console.log);

productsTableModel
  .sync()
  .then(() => console.log("Products table created"))
  .catch(console.log);