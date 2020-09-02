import express from 'express'
import bodyParser from 'body-parser'

const port = process.env.port
let app = express()

app.use(bodyParser)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})