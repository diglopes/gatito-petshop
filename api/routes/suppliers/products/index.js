const router = require("express").Router({ mergeParams: true });
const ProductsDAO = require("./products-dao");
const Product = require("./product");
const reviewRoutes = require("./reviews");
const ProductsSerializer = require("../../../utils/response/products-serializer");
const headersEnum = require("../../../utils/headers-enum");

router.get("/", async (req, res) => {
  const supplierId = req.params.idFornecedor;
  const dao = new ProductsDAO();
  const products = await dao.index(supplierId);
  const serializer = new ProductsSerializer(res.getHeader(headersEnum.CONTENT_TYPE))
  res.send(serializer.serialize(products));
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
    const serializer = new ProductsSerializer(res.getHeader(headersEnum.CONTENT_TYPE))
    serializer.addPublicFields([
      "estoque",
      "idFornecedor",
      "data_criacao",
      "data_atualizacao",
      "versao",
    ])
    res.send(serializer.serialize(product))
  } catch (error) {
    next(error)
  }
})

router.delete("/:idProduto", async (req, res) => {
  const { idProduto: id, idFornecedor } = req.params
  const product = new Product({ id, idFornecedor})
  await product.remove()
  res.status(204)
  res.end()
})

router.use("/:idProduto/avaliacoes", reviewRoutes)

module.exports = router;
