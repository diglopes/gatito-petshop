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

router.post("/", async (req, res, next) => {
  try {
    const supplierId = req.params.idFornecedor;
    const { estoque = 0, preco, titulo } = req.body
    const product = new Product({ idFornecedor: supplierId, estoque, preco, titulo })
    await product.create()
    const serializer = new ProductsSerializer(res.getHeader(headersEnum.CONTENT_TYPE))
    serializer.addPublicFields([
      "estoque",
      "idFornecedor",
      "data_criacao",
      "data_atualizacao",
      "versao",
    ])
    res.set("ETag", product.versao)
    const lastModofiedTimestamp = new Date(product.data_atualizacao).getTime()
    res.set("Last-Modified", lastModofiedTimestamp)
    const locationUrl = `/api/fornecedores/${product.idFornecedor}/produtos/${product.id}`
    res.set("Location", locationUrl)
    res.status(201)
    res.send(serializer.serialize(product))
  } catch (error) {
    next(error);
  }
});

router.get("/estoque-baixo", async (req, res, next) => {
  try {
    const { idFornecedor } = req.params
    const dao = new ProductsDAO();
    const serializer = new ProductsSerializer(res.getHeader(headersEnum.CONTENT_TYPE))
    const minimumAmount = 5
    const products = await dao.lowStock(idFornecedor, minimumAmount)
    serializer.addPublicFields([
      "estoque",
    ])
    res.send(serializer.serialize(products))
  } catch (error) {
    next(error)
  }
})

router.get("/:idProduto", async (req, res, next) => {
  try {
    const { idProduto: id, idFornecedor } = req.params
    const product = new Product({ id, idFornecedor })
    await product.load()
    const serializer = new ProductsSerializer(res.getHeader(headersEnum.CONTENT_TYPE))
    serializer.addPublicFields([
      "estoque",
      "idFornecedor",
      "data_criacao",
      "data_atualizacao",
      "versao",
    ])
    res.set("ETag", product.versao)
    const lastModofiedTimestamp = new Date(product.data_atualizacao).getTime()
    res.set("Last-Modified", lastModofiedTimestamp)
    res.send(serializer.serialize(product))
  } catch (error) {
    next(error)
  }
})

router.head("/:idProduto", async (req, res, next) => {
  try {
    const { idProduto: id, idFornecedor } = req.params
    const product = new Product({ id, idFornecedor })
    await product.load()
    res.set("ETag", product.versao)
    const lastModofiedTimestamp = new Date(product.data_atualizacao).getTime()
    res.set("Last-Modified", lastModofiedTimestamp)
    res.end()
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

router.put("/:idProduto", async (req, res, next) => {
  try {
  const { idProduto: id, idFornecedor } = req.params
    const data = Object.assign({}, req.body, {
      id,
      idFornecedor
    })
    const product = new Product(data)
    await product.update()
    await product.load()
    res.set("ETag", product.versao)
    const lastModofiedTimestamp = new Date(product.data_atualizacao).getTime()
    res.set("Last-Modified", lastModofiedTimestamp)
    res.status(204)
    res.end()
  } catch (error) {
    next(error)
  }
})

router.post("/:idProduto/diminuir-estoque", async (req, res, next) => {
  try {
    const { idProduto: id, idFornecedor } = req.params
    const product = new Product({ id, idFornecedor })
    await product.load()
    product.estoque -= req.body.quantidade 
    await product.decreaseStock()
    await product.load()
    res.set("ETag", product.versao)
    const lastModofiedTimestamp = new Date(product.data_atualizacao).getTime()
    res.set("Last-Modified", lastModofiedTimestamp)
    res.status(204)
    res.end()
  } catch (error) {
    next(error)
  }
})

router.use("/:idProduto/avaliacoes", reviewRoutes)

module.exports = router;
