const router = require("express").Router();
const suppliersTable = require("./table");
const SuppliersSerializer = require("../../utils/response/suppliers-serializer");
const headersEnum = require("../../utils/headers-enum");

router.get("/", async (req, res) => {
  const result = await suppliersTable.index();
  const serializer = new SuppliersSerializer(
    res.getHeader(headersEnum.CONTENT_TYPE)
  );
  res.send(serializer.serialize(result));
});


module.exports = router