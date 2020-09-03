const express = require('express')
const bodyParser = require('body-parser')
const api = require("./server/api")

const port = process.env.port || 5000
let app = express()

app.use(bodyParser.json())
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

app.get("/health", (req, res) =>{
    res.json({message: "Application healthy and running."})
})

app.use("/api", api)