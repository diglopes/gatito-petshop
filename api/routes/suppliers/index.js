const router = require("express").Router()
const suppliersTable = require("./table")
const Supplier = require("./supplier")

router.get("/", async (req, res) => {
   const result = await suppliersTable.index()
   res.json(result)
})

router.post("/", async (req, res) => {
   try {
      const data = req.body
      const supplier = new Supplier(data)
      await supplier.create()
      res.status(201).json(supplier)
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
})

router.get("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const supplier = new Supplier({ id })
      await supplier.load()
      res.json(supplier)
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
})

router.put("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const data = req.body
      const supplier = new Supplier({ id, ...data })
      await supplier.update()
      res.end()
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
})

router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const supplier = new Supplier({ id })
      await supplier.load()
      await supplier.remove()
      res.end()
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
})

module.exports = router