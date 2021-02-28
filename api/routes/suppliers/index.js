const router = require("express").Router();
const suppliersTable = require("./table");
const Supplier = require("./supplier");
const SuppliersSerializer = require("../../utils/response/suppliers-serializer");
const headersEnum = require("../../utils/headers-enum");
const productRoutes = require("./products")

router.get("/", async (req, res) => {
  const result = await suppliersTable.index();
  const serializer = new SuppliersSerializer(
    res.getHeader(headersEnum.CONTENT_TYPE)
  );
  res.send(serializer.serialize(result));
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const supplier = new Supplier(data);
    await supplier.create();
    const serializer = new SuppliersSerializer(
      res.getHeader(headersEnum.CONTENT_TYPE)
    );
    res.status(201);
    res.send(serializer.serialize(supplier));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = new Supplier({ id });
    await supplier.load();
    const serializer = new SuppliersSerializer(
      res.getHeader(headersEnum.CONTENT_TYPE)
    );
    serializer.addPublicFields([
      "email",
      "data_criacao",
      "data_atualizacao",
      "versao",
    ]);
    res.send(serializer.serialize(supplier));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const supplier = new Supplier({ id, ...data });
    await supplier.update();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = new Supplier({ id });
    await supplier.load();
    await supplier.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.use('/:idFornecedor/produtos', productRoutes)

module.exports = router;
