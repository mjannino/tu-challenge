const db = require('../db-config')

async function getAllTuRecords(){
    return await db.select().table('tu_records')
}

async function getTuRecordById(id){
    if(!id) throw new Error(`Invalid ID in getTuRecordById: ${id}`)
    return await db('tu_records').where('_id', id).first()
}

/**
 * Before entering this function, sanitize @param body 
 * Ensure the key: value mapping matches that of `tu_records`
 */
async function createTuRecord(body){
    let ids = await db('tu_records').insert(body)
    return returnRecords(ids)
}

/**
 * Before entering this function, sanitize @param body 
 * Ensure the key: value mapping matches that of `tu_records`
 */
async function modifyTuRecord(id, body){
    if(!id) throw new Error(`Invalid ID in modifyTuRecord: ${id}`)
    let numUpdated = await db('tu_records').where('_id', id).update(body)
    return returnRecords(numUpdated)
}

async function deleteTuRecord(id){
    if(!id) throw new Error(`Invalid ID in deleteTuRecord: ${id}`)
    let deleted = await db('tu_records').where('_id', id).del()
    return returnRecords(deleted)
}

function returnRecords(records){
    if(!records){
        return null
    }else if(records.length > 1){
        return records
    }else if(records.length == 1){
        return records[0]
    }else{
        return records
    }
}

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