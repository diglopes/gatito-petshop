const router = require("express").Router()
const suppliersTable = require("./table")
const Supplier = require("./supplier")

router.get("/", async (req, res) => {
   const result = await suppliersTable.index()
   res.status(200).json(result)
})

router.post("/", async (req, res, next) => {
   try {
      const data = req.body
      const supplier = new Supplier(data)
      await supplier.create()
      res.status(201).json(supplier)
   } catch (error) {
     next(error)
   }
})

router.get("/:id", async (req, res, next) => {
   try {
      const { id } = req.params
      const supplier = new Supplier({ id })
      await supplier.load()
      res.json(supplier)
   } catch (error) {
      next(error)
   }
})

router.put("/:id", async (req, res, next) => {
   try {
      const { id } = req.params
      const data = req.body
      const supplier = new Supplier({ id, ...data })
      await supplier.update()
      res.status(204).end()
   } catch (error) {
      next(error)
   }
})

router.delete("/:id", async (req, res, next) => {
   try {
      const { id } = req.params
      const supplier = new Supplier({ id })
      await supplier.load()
      await supplier.remove()
      res.status(204).end()
   } catch (error) {
      next(error)
   }
})

module.exports = router