const express = require("express")
const config = require("config");


const app = express()
app.use(express.json())

const PORT = config.get("App.port")

app.listen(PORT, () => console.log("App running on port", PORT))  