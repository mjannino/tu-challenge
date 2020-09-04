const express = require('express')
const bodyParser = require('body-parser')
const api = require("./server/api")

const PORT = process.env.PORT || 5000
let app = express()

app.use(bodyParser.json())
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Welcome to the tu-challenge application. Endpoints are under the /api path.")
})

app.get("/health", (req, res) =>{
    res.json({message: "Application healthy and running."})
})

app.use("/api", api)