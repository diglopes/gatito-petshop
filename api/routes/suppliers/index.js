const router = require("express").Router()
const suppliersTable = require("./table")
const Supplier = require("./supplier")

router.get("/", async (req, res) => {
   const result = await suppliersTable.index()
   res.json(result)
})

router.post("/", async (req, res) => {
   const data = req.body
   const supplier = new Supplier(data)
   await supplier.create()
   res.status(201).json(supplier)
})

module.exports = router