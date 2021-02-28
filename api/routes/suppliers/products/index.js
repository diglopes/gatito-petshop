const router = require("express").Router({ mergeParams: true })
const ProductsDAO = require("./products-dao")

router.get("/", async (req, res) => {
    const supplierId = req.params.idFornecedor
    const dao = new ProductsDAO()
    const products = await dao.index(supplierId)
    res.send(JSON.stringify(products))
})


module.exports = router