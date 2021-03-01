const router = require("express").Router({ mergeParams: true });
const ProductsDAO = require("./products-dao");
const Product = require("./product");
const reviewRoutes = require("./reviews")

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

router.get("/:idProduto", async (req, res, next) => {
  try {
    const id = req.params.idProduto
    const product = new Product({ id })
    await product.load()
    res.send(JSON.stringify(product))
  } catch (error) {
    next(error)
  }
})

router.use("/:idProduto/avaliacoes", reviewRoutes)

module.exports = router;
