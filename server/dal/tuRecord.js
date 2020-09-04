const db = require('../db-config')

async function getAllTuRecords(){
    return await db.select().table('tu_records')
}

async function getTuRecordById(id){
    return await db('tu_records').where('_id', id).first()
}

async function createTuRecord(){return}

async function modifyTuRecord(){return}

async function deleteTuRecord(){return}

function dbBoolToBool(x){
    return !x ? false : true
}

function tuRequestToRecord(body){
    return {
        value1: body.value1,
        value2: body.value2,
        value3: body.value3
    }
}

function tuRecordToResponse(record){
    let timestamp = (new Date()).getTime()
    let { _id, value1, value2, value3 } = record
    value3 = dbBoolToBool(value3)
    let responseBody = {
        "id": _id,
        "timestamp": timestamp,
        value1,
        value2,
        value3
    }
    return responseBody
}

module.exports = {
    getAllTuRecords,
    getTuRecordById,
    createTuRecord,
    modifyTuRecord,
    deleteTuRecord,
    dbBoolToBool,
    tuRequestToRecord,
    tuRecordToResponse
}