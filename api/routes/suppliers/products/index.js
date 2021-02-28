const router = require("express").Router({ mergeParams: true });
const ProductsDAO = require("./products-dao");
const Product = require("./product")

router.get("/", async (req, res) => {
  const supplierId = req.params.idFornecedor;
  const dao = new ProductsDAO();
  const products = await dao.index(supplierId);
  res.send(JSON.stringify(products));
});

router.post("/", async (req, res) => {
  try {
    const supplierId = req.params.idFornecedor;
    const { estoque = 0, preco, titulo } = req.body
    const product = new Product({ idFornecedor: supplierId, estoque, preco, titulo })
    await product.create()
    res.status(201)
    res.send(JSON.stringify(product))
  } catch (error) {
    next(error);
  }
});

module.exports = router;
