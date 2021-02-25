const express = require("express")
const config = require("config")
const suppliersRoutes = require("./routes/suppliers")

const app = express()

app.use(express.json())
app.use("/api/fornecedores", suppliersRoutes)

const PORT = config.get("App.port")

app.listen(PORT, () => console.log("App running on port", PORT))  