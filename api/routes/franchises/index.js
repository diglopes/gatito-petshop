const router = require("express").Router()
const franchisesTable = require("./table")

router.get("/", async (req, res) => {
    const franchises = await franchisesTable.index()
    res.send(franchises)
})

module.exports = router