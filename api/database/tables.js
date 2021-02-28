const suppliersTableModel = require("../routes/suppliers/table-model");
const franchisesTableModel = require("../routes/franchises/table-model");
const productsTableModel = require("../routes/suppliers/products/product-model")
const reviewsTableModel = require("../routes/suppliers/products/reviews/review-model")

const tables = [
  suppliersTableModel,
  franchisesTableModel,
  productsTableModel,
  reviewsTableModel
]

async function createTables () {
  tables.forEach(table => table.sync())
}

createTables()