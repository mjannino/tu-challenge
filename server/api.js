const express = require('express')
const api = express.Router()
const {
    tuRequestSchema,
    tuRequestValidator
} = require('./dal/tuRequestSchema')
const dal = require("./dal/tuRecord")

function validateTuRequestBody(req, res){
    try { 
        tuRequestValidator.validate(req.body, tuRequestSchema, {"throwError": true});
    } catch(error) { 
        res.status(401).end("Invalid body format: " + error.message); 
    }
}

/**
 * Generalized router-specific middleware
 * validates we are getting a json request
 * and does extra validation on the request body
 * if there is a body, as all bodies are the
 * same spec for this route [MJ]
 */
api.use(function (req, res, next) {
    // if(req.get("Content-Type") != "application/json") { 
    //     res.status(401).send("Invalid header format"); 
    // }
    if(req.method == "POST" || req.method == "PUT"){
        validateTuRequestBody(req, res)
    }
    next()
})

api.get('/list', (req, res) => {
    let allRecs = dal.getAllTuRecords()
    // allRecs = allRecs.map(x => dal.tuRecordToResponse(x))
    res.send(allRecs)
})

api.get('/read/:recordId', (req, res) => {
    let { recordId } = req.params
    let record = dal.getTuRecordById(recordId)
    record = dal.tuRecordToResponse(record)
    res.send(record)
})

api.post('/create', (req, res) => {
    res.send('POST to create a record')
})

api.put('/modify/:recordId', (req, res) => {
    let { recordId } = req.params
    res.send('PUT to modify a record')
})

api.delete('/remove/:recordId', (req, res) => {
    let { recordId } = req.params
    res.send('DELETE to delete a record')
})


module.exports = api

/**
 * 

if(req.get("Content-Type")!="application/json") { 
    res.status(401).send("Invalid header format"); 
    return;
}
try { 
    validator.validate(req.body,itemSchema, "throwError":true});
} catch(error) { 
    res.status(401).end("Invalid body format: " + error.message); 
    return;
}
 */

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

  /**
   * RESPONSE:
   * 
    the unique ID (default name generally defined by the DB)
    the timestamp : timestamp
    the value 1 provided during the creation of the record
    the value 2 provided during the creation of the record
    the value 3 provided during the creation of the record

   */