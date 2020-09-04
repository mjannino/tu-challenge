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
    if(!ids){
        return null
    }else if(ids.length > 1){
        return ids
    }else{
        return ids[0]
    }
}

/**
 * Before entering this function, sanitize @param body 
 * Ensure the key: value mapping matches that of `tu_records`
 */
async function modifyTuRecord(id, body){return}

async function deleteTuRecord(id){return}

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