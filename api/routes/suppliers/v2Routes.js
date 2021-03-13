const router = require("express").Router();
const suppliersTable = require("./table");
const SuppliersSerializer = require("../../utils/response/suppliers-serializer");
const headersEnum = require("../../utils/headers-enum");
const Supplier = require("./supplier");

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


module.exports = router