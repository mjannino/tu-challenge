const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.port || 5000
let app = express()

app.use(bodyParser.json())

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

app.get("/health", (req, res) =>{
    res.json({message: "Application tu-challenge healthy and running."})
})