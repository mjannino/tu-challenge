const express = require('express')
const api = express.Router()
const {
    tuRequestSchema,
    tuRequestValidator
} = require('./dal/tuRequestSchema')
const dal = require("./dal/tuRecord");
const { createTuRecord } = require('./dal/tuRecord');

/**
 * Use `jsonschema` to validate the shape and type of incoming body data
 */
function validateTuRequestBody(req, res){
    try { 
        tuRequestValidator.validate(req.body, tuRequestSchema, {"throwError": true});
    } catch(error) { 
        res.status(401).end("Invalid body format: " + error.message)
    }
}

function isEmpty(obj){
    if(Object.keys(obj).length === 0){
        return true
    }
    return false
}

/**
 * Generalized router-specific middleware
 * validates we are getting a json request
 * and does extra validation on the request body
 * if there is a body, as all bodies are the
 * same spec for this route [MJ]
 */
api.use(function (req, res, next) {
    if(req.get("Content-Type") != "application/json") { 
        res.status(401).send("Invalid header format, expected application/json"); 
    }
    if(req.method == "POST" || req.method == "PUT"){
        console.log("Validating request body...")
        validateTuRequestBody(req, res)
    }
    next()
})

api.get('/list', async (req, res) => {
    let allRecs
    try{
        allRecs = await dal.getAllTuRecords()
    }catch (error){
        res.status(400).end("Database error: " + error.message)
        return
    }
    
    let hasRecs = !isEmpty(allRecs)
    if(hasRecs){
        allRecs = allRecs.map(x => dal.tuRecordToResponse(x))
        res.send(allRecs)
        return
    }else{
        res.send({"message":"There are no tuRecords to return."})
        return
    }
})

api.get('/read/:recordId', async (req, res) => {
    let { recordId } = req.params
    let record
    try{
        record = await dal.getTuRecordById(recordId)
        if(!record){
            res.send({"message": `No record found with ID of ${recordId}`})
            return;
        }
    }catch (error){
        res.status(400).end("Database error: " + error.message)
        return
    }
    
    record = dal.tuRecordToResponse(record)
    res.send(record)
})

api.post('/create', async (req, res) => {
    let transformedBody = dal.tuRequestToRecord(req.body)
    let recordId, record
    try{
        recordId = await dal.createTuRecord(transformedBody)
        record = await dal.getTuRecordById(recordId)
    }catch (error){
        res.status(400).end(error.message)
        return
    }
    record = dal.tuRecordToResponse(record)
    res.send(record)
})

api.put('/modify/:recordId', async (req, res) => {
    let { recordId } = req.params
    let transformedBody = dal.tuRequestToRecord(req.body)
    let record
    try{
        record = await dal.getTuRecordById(recordId)
        if(!record){
            res.send({"message": `No record found with ID of ${recordId}`})
            return;
        }
        // There are ways with Knex to return the record, but they're 
        // not common and difficult with sqlite3, the database
        // i chose for this exercise. with postgres or mysql, the additional
        // database trip is not necessary
        await dal.modifyTuRecord(recordId, transformedBody)
        record = await dal.getTuRecordById(recordId)
    }catch (error){
        res.status(400).end(error.message)
        return
    }
    record = dal.tuRecordToResponse(record)
    res.send(record)
})

api.delete('/remove/:recordId', async (req, res) => {
    let { recordId } = req.params
    let record
    try{
        record = await dal.getTuRecordById(recordId)
        if(!record){
            res.send({"message": `No record found with ID of ${recordId}`})
            return;
        }
        await dal.deleteTuRecord(recordId)
    }catch (error){
        res.status(400).end("Database error: " + error.message)
        return
    }
    record = dal.tuRecordToResponse(record)
    res.send({"message": "Record succesfully deleted", "data": record})
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