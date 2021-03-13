const express = require("express");
const config = require("config");
const franchisesRoutes = require("./routes/franchises");
const errorHandler = require("./middlewares/error-handler");
const contentTypeValidator = require("./middlewares/content-type-validator");
const { v1: suppliersV1, v2: suppliersV2} = require("./routes/suppliers")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())
app.use(contentTypeValidator)
app.use((_, res, next) => {
    res.set("X-Powered-By", "Gatito")
    next()
})

app.use("/api/fornecedores", suppliersV1);
app.use("/api/v2/fornecedores", suppliersV2)
app.use("/api/franquias", franchisesRoutes);
app.use(errorHandler);

const PORT = config.get("App.port");

app.listen(PORT, () => console.log("App running on port", PORT));
