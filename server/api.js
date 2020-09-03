const express = require('express')
const api = express.Router()


router.get('/list', (req, res) => {
    res.send('GET All records')
})

router.get('/read/:recordId', (req, res) => {
    res.send('GET one single record')
})

router.post('/create', (req, res) => {
    res.send('POST to create a record')
})

router.put('/modify/:recordId', (req, res) => {
    res.send('PUT to modify a record')
})

router.delete('/remove/:recordId', (req, res) => {
    res.send('DELETE to delete a record')
})


module.exports = api


/**
 * 
 * 
/api/list 	List all the records GET
/api/create 	Create a record** POST
/api/read/:recordId 	Read a specific record GET
/api/modify/:recordId 	Update a specific record PUT
/api/remove/:recordId 	Delete a specific record DELETE
 */


 /**
  * {
"timestamp": timestamp,
"value1": value1,
"value2": value2,
"value3": value3
}
  */