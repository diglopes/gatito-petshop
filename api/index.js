const express = require("express");
const config = require("config");
const suppliersRoutes = require("./routes/suppliers");
const franchisesRoutes = require("./routes/franchises");
const errorHandler = require("./middlewares/error-handler");
const contentTypeValidator = require("./middlewares/content-type-validator");

const app = express();

app.use(express.json());
app.use(contentTypeValidator)
app.use((_, res, next) => {
    res.set("X-Powered-By", "Gatito")
    next()
})
app.use("/api/fornecedores", suppliersRoutes);
app.use("/api/franquias", franchisesRoutes);
app.use(errorHandler);

const PORT = config.get("App.port");

app.listen(PORT, () => console.log("App running on port", PORT));
