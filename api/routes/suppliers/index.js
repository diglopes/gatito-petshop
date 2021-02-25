const router = require("express").Router()
const suppliersTable = require("./table")

router.use("/", async (req, res) => {
   const result = await suppliersTable.index()
   res.json(result)
})

module.exports = router