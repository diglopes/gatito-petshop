const express = require("express")
const config = require("config")
const suppliersRoutes = require("./routes/suppliers")
const franchisesRoutes = require("./routes/franchises")
const app = express()

app.use(express.json())
app.use("/api/fornecedores", suppliersRoutes)
app.use("/api/franquias", franchisesRoutes)

const PORT = config.get("App.port")

app.listen(PORT, () => console.log("App running on port", PORT))  